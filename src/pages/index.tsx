import { GetStaticProps } from 'next';
import Stripe from 'stripe';

import { stripe } from 'lib/stripe';

import HomeTemplate, { HomeTemplateProps } from 'templates/HomeTemplate';

export default function Home({ products }: HomeTemplateProps) {
	return <HomeTemplate products={products} />;
}

export const getStaticProps: GetStaticProps = async () => {
	const { data } = await stripe.products.list({
		expand: ['data.default_price'],
	});

	const products = data.map((product) => {
		const price = product.default_price as Stripe.Price;

		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			price: new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format((price.unit_amount as number) / 100),
		};
	});

	return {
		props: {
			products,
		},
		revalidate: 60 * 60 * 1, // 1 hour
	};
};
