import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { Handbag } from 'phosphor-react';

import logoImg from 'assets/logo.svg';
import { keyframes } from 'styles';

import { Drawer } from 'components/Drawer';

import { useCartShoppingContext } from 'hooks/useCartShoppingContext';

import * as S from './styles';

export default function Header() {
	const [cartShoppingIsOpen, setCartShoppingIsOpen] = useState(false);

	const [aimation, setAnimation] = useState('');

	const { products } = useCartShoppingContext();

	const { pathname } = useRouter();

	const openAnimation = keyframes({
		'0%': { transform: 'translateX(100%)' },
		'100%': { transform: 'translateX(0%)' },
	});

	const closeAnimation = keyframes({
		'0%': { transform: 'translateX(0%)' },
		'100%': { transform: 'translateX(100%)' },
	});

	const handleOpenCartShopping = () => {
		if (products.length === 0) return;

		setAnimation(`${openAnimation} 200ms`);

		setCartShoppingIsOpen(true);
	};

	const handleCloseCartShopping = () => {
		setAnimation(`${closeAnimation} 200ms`);

		setTimeout(() => {
			setCartShoppingIsOpen(false);
		}, 200);
	};

	if (pathname === '/success') {
		return (
			<S.Container
				style={{
					justifyContent: 'center',
				}}
			>
				<Link href='/'>
					<Image src={logoImg} alt='' />
				</Link>
			</S.Container>
		);
	}

	return (
		<S.Container>
			<Link href='/'>
				<Image src={logoImg} alt='' />
			</Link>

			<S.ShoppingCartButton onClick={handleOpenCartShopping}>
				{products.length > 0 && <span>{products.length}</span>}

				<Handbag weight='bold' size={24} />
			</S.ShoppingCartButton>

			{cartShoppingIsOpen && products.length > 0 && (
				<Drawer
					style={{ animation: `${aimation}` }}
					onCloseCartShopping={handleCloseCartShopping}
				/>
			)}
		</S.Container>
	);
}
