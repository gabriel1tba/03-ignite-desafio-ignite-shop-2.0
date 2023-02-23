import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';

import * as S from './styles';

type Product = {
	id: string;
	name: string;
	imageUrl: string;
	price: string;
};

export interface HomeTemplateProps {
	products: Product[];
}

export default function HomeTemplate({ products }: HomeTemplateProps) {
	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			perView: 2,
			spacing: 48,
		},
		breakpoints: {
			'(max-width: 768px)': {
				slides: {
					perView: 1,
					spacing: 24,
				},
			},
		},
	});

	return (
		<S.Container ref={sliderRef} className='keen-slider'>
			<Head>
				<title>Ignite Shop</title>
			</Head>
			{products.length > 0 &&
				products.map(({ id, name, imageUrl, price }) => (
					<Link key={id} href={`/product/${id}`} prefetch={false}>
						<S.Product className='keen-slider__slide'>
							<Image src={imageUrl} alt='Camiseta 1' width={520} height={480} />

							<footer>
								<strong>{name}</strong>
								<span>{price}</span>
							</footer>
						</S.Product>
					</Link>
				))}
		</S.Container>
	);
}
