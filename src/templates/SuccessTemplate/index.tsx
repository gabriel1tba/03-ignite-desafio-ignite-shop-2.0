import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import * as S from './styles';

type Product = {
	name: string;
	imageUrl: string;
};

export interface SuccessTemplateProps {
	costumerName: string;
	product: Product;
}

export default function SuccessTemplate({
	costumerName,
	product,
}: SuccessTemplateProps) {
	return (
		<S.Container>
			<Head>
				<title>Compra efetuada | Ignite Shop</title>

				<meta name='robots' content='noindex' />
			</Head>

			<h1>Compra efetuada</h1>

			<S.ImageContainer>
				<Image src={product.imageUrl} width={120} height={110} alt='' />
			</S.ImageContainer>

			<p>
				Uhuul <strong>{costumerName}</strong>, sua{' '}
				<strong>{product.name}</strong> já está a caminho da sua casa.
			</p>

			<Link href='/'>Voltar ao catálogo</Link>
		</S.Container>
	);
}
