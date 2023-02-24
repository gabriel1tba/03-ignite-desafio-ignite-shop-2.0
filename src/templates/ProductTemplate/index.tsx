import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

import { useCartShoppingContext } from 'hooks/useCartShoppingContext';

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

	const { addProduct } = useCartShoppingContext();

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
				<button onClick={() => addProduct(product)}>Colocar na sacola</button>
			</S.ProductDetails>
		</S.Container>
	);
}

export default ProductTemplate;
