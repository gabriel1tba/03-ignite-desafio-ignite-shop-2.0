import { GetStaticPaths, GetStaticProps } from 'next';
import Stripe from 'stripe';

import { stripe } from 'lib/stripe';

import ProductTemplate, {
	ProductTemplateProps,
} from 'templates/ProductTemplate';

export default function Product({ product }: ProductTemplateProps) {
	return <ProductTemplate product={product} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await stripe.products.list();

	const paths = data.map((product) => ({
		params: { id: product.id },
	}));

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const productId = params?.id as string;

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price'],
	});

	const price = product.default_price as Stripe.Price;

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				unitAmount: price.unit_amount,
				price: new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				}).format((price.unit_amount as number) / 100),
				description: product.description,
				defaultPriceId: price.id,
				quantity: 1,
			},
		},
		revalidate: 60 * 60 * 1, // 1 hour
	};
};
