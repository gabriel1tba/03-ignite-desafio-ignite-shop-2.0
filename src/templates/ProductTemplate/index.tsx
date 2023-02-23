import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

import * as S from './styles';

type Product = {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
	unitAmount: number;
	description: string;
	defaultPriceId: string;
	quantity: number;
};

export interface ProductTemplateProps {
	product: Product;
}

function ProductTemplate({ product }: ProductTemplateProps) {
	const { isFallback } = useRouter();

	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
		useState(false);

	const handleBuyButton = async () => {
		try {
			setIsCreatingCheckoutSession(true);

			const { data } = await axios.post('/api/checkout', {
				priceId: product.defaultPriceId,
			});

			const { checkoutUrl } = data;

			window.location.href = checkoutUrl;
		} catch (err) {
			setIsCreatingCheckoutSession(false);

			console.log('Falha ao redirecionar ao checkout!');
		}
	};

	if (isFallback) {
		return (
			<S.Container>
				<Head>
					<title>Ignite Shop</title>
				</Head>
				<S.ImageContainerSkeleton />
				<S.ProductDetailsSkeleton>
					<div />
					<div />
					<div />
				</S.ProductDetailsSkeleton>
			</S.Container>
		);
	}

	return (
		<S.Container>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>

			<S.ImageContainer>
				<Image src={product.imageUrl} width={520} height={480} alt='' />
			</S.ImageContainer>

			<S.ProductDetails>
				<h1>{product.name}</h1>
				<span>{product.price}</span>
				<p>{product.description}</p>
				<button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
					Comprar agora
				</button>
			</S.ProductDetails>
		</S.Container>
	);
}

export default ProductTemplate;
