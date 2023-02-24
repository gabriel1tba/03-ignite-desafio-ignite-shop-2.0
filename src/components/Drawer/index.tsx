import { useState, CSSProperties } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { CircleNotch, Minus, Plus, TrashSimple, X } from 'phosphor-react';

import { useCartShoppingContext } from 'hooks/useCartShoppingContext';

import * as S from './styles';

interface DrawerProps {
	style?: CSSProperties;
	onCloseCartShopping: () => void;
}

export function Drawer({ style, onCloseCartShopping }: DrawerProps) {
	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
		useState(false);

	const { decrement, increment, removeProduct, products, totalAmount } =
		useCartShoppingContext();

	const handleBuyProduct = async () => {
		try {
			setIsCreatingCheckoutSession(true);

			const orderList = products.map((product) => {
				return {
					price: product.defaultPriceId,
					quantity: product.quantity,
				};
			});

			const {
				data: { checkoutUrl },
			} = await axios.post('/api/checkout', { orderList });

			window.location.href = checkoutUrl;
		} catch (err) {
			console.error(err);
		} finally {
			setIsCreatingCheckoutSession(false);
		}
	};

	return (
		<S.Overlay>
			<S.Container style={style}>
				<S.CloseButton onClick={onCloseCartShopping}>
					<X weight='bold' size={24} />
				</S.CloseButton>

				<h2>Sacola de compras</h2>

				<S.Items>
					{products.map((product) => {
						return (
							<S.Item key={product.id}>
								<S.ImageContainer>
									<Image
										src={product.imageUrl}
										width={100}
										height={100}
										alt=''
									/>
								</S.ImageContainer>

								<S.Info>
									<span>{product.name}</span>
									<strong>{product.price}</strong>
								</S.Info>

								<S.Actions>
									<div className='quantity'>
										<button onClick={() => decrement(product.id)}>
											<Minus weight='bold' color='white' size={14} />
										</button>

										<span>{product.quantity}</span>

										<button onClick={() => increment(product.id)}>
											<Plus weight='bold' color='white' size={14} />
										</button>
									</div>

									<button
										className='remove'
										onClick={() => removeProduct(product.id)}
									>
										<TrashSimple weight='bold' color='white' size={14} />
										Remover
									</button>
								</S.Actions>
							</S.Item>
						);
					})}
				</S.Items>

				<S.PurchaseDetails>
					<div>
						<p>Quantidade</p>
						<span>{products.length} items</span>
					</div>

					<div>
						<p>Valor total</p>
						<span>{totalAmount}</span>
					</div>

					<button
						onClick={handleBuyProduct}
						disabled={isCreatingCheckoutSession}
					>
						{isCreatingCheckoutSession ? (
							<CircleNotch className='loading' weight='bold' />
						) : (
							'Finalizar compra'
						)}
					</button>
				</S.PurchaseDetails>
			</S.Container>
		</S.Overlay>
	);
}
