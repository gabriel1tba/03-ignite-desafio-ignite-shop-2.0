import { useMemo } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import * as S from './styles';

type Product = {
	id: string;
	name: string;
	imageUrl: string;
	quantity: number;
};

export interface SuccessTemplateProps {
	customerName: string;
	products: Product[];
}

export default function SuccessTemplate({
	customerName,
	products,
}: SuccessTemplateProps) {
	const totalQuantity = useMemo(() => {
		return products.reduce((acc, product) => {
			return acc + product.quantity;
		}, 0);
	}, [products]);

	return (
		<S.Container>
			<Head>
				<title>Compra efetuada | Ignite Shop</title>

				<meta name='robots' content='noindex' />
			</Head>

			<h1>Compra efetuada!</h1>

			<S.Images>
				{products.map((product) => (
					<S.ImageContainer key={product.id}>
						<span>{product.quantity}</span>
						<Image src={product.imageUrl} width={130} height={140} alt='' />
					</S.ImageContainer>
				))}
			</S.Images>

			<p>
				Uhuul <strong>{customerName}</strong>, sua compra de{' '}
				<strong>
					{totalQuantity} {totalQuantity > 1 ? 'camisetas' : 'camiseta'}
				</strong>{' '}
				já está a caminho da sua casa.
			</p>

			<Link href='/'>Voltar ao catálogo</Link>
		</S.Container>
	);
}
