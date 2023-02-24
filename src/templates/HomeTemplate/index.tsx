import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { CaretLeft, CaretRight, Handbag } from 'phosphor-react';
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
	const [current, setCurrent] = useState(0);

	const [sliderRef, instanceRef] = useKeenSlider({
		slides: {
			origin: 'center',
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

		animationEnded(event) {
			setCurrent(event.track.details.abs);

			const currentInstanceRef =
				event.container.children[event.track.details.abs]?.children[0]
					.classList;

			if (currentInstanceRef) {
				currentInstanceRef.add('active');
			}
		},

		animationStarted(event) {
			const currentInstanceRef =
				event.container.children[event.track.details.abs]?.children[0]
					.classList;

			if (currentInstanceRef) {
				currentInstanceRef.remove('active');
			}
		},
	});

	useEffect(() => {
		const currentInstanceRef =
			instanceRef.current?.container.children[0].children[0].classList;

		if (currentInstanceRef) {
			currentInstanceRef.add('active');
		}
	}, [instanceRef]);

	console.log(current);

	return (
		<S.Container ref={sliderRef} className='keen-slider'>
			<Head>
				<title>Ignite Shop</title>
			</Head>

			{current > 0 && (
				<S.ArrowLeft
					onClick={(e: any) =>
						e.stopPropagation() || instanceRef.current?.prev()
					}
				>
					<CaretLeft weight='bold' size={48} />
				</S.ArrowLeft>
			)}

			<div ref={sliderRef} className='keen-slider'>
				{products.map((product) => {
					return (
						<Link
							href={`/product/${product.id}`}
							key={product.id}
							prefetch={false}
						>
							<S.Product className='keen-slider__slide'>
								<Image src={product.imageUrl} width={520} height={480} alt='' />

								<footer>
									<div className='title'>
										<strong>{product.name}</strong>
										<span>{product.price}</span>
									</div>

									<div className='icon'>
										<Handbag weight='bold' size={32} />
									</div>
								</footer>
							</S.Product>
						</Link>
					);
				})}
			</div>

			{current <= products.length - 2 && (
				<S.ArrowRight
					onClick={(e: any) =>
						e.stopPropagation() || instanceRef.current?.next()
					}
				>
					<CaretRight weight='bold' size={48} />
				</S.ArrowRight>
			)}
		</S.Container>
	);
}
