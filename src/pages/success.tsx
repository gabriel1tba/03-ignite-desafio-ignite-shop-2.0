import { GetServerSideProps } from 'next';
import Stripe from 'stripe';

import { stripe } from 'lib/stripe';
import SuccessTemplate, {
	SuccessTemplateProps,
} from 'templates/SuccessTemplate';

export default function Success({
	customerName,
	products,
}: SuccessTemplateProps) {
	return <SuccessTemplate customerName={customerName} products={products} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	if (!query.session_id) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const sessionId = String(query.session_id);

	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'line_items.data.price.product'],
	});

	const customerName = session.customer_details?.name;

	const products = session.line_items?.data.map((item) => {
		const product = item.price?.product as Stripe.Product;

		return {
			id: product.id,
			name: product.name,
			imageUrl: product.images[0],
			quantity: item.quantity,
		};
	});

	return {
		props: {
			customerName,
			products,
		},
	};
};
