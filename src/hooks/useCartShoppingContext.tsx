import {
	useState,
	useMemo,
	useCallback,
	createContext,
	useContext,
	ReactNode,
} from 'react';

interface Product {
	id: string;
	name: string;
	imageUrl: string;
	unitAmount: number;
	price: string;
	defaultPriceId: string;
	quantity: number;
}

interface CartShoppingContextData {
	addProduct: (item: Product) => void;
	removeProduct: (id: string) => void;
	increment: (id: string) => void;
	decrement: (id: string) => void;
	products: Product[];
	totalAmount: string;
}

export const CartShoppingContext = createContext({} as CartShoppingContextData);

interface CartShoppingProviderProps {
	children: ReactNode;
}

export function CartShoppingProvider({ children }: CartShoppingProviderProps) {
	const [products, setProducts] = useState<Product[]>([]);

	const addProduct = useCallback(
		(item: Product) => {
			const productIndex = products.findIndex(
				(product) => product.id === item.id
			);

			if (productIndex >= 0) {
				return;
			}

			setProducts((prevState) => [
				...prevState,
				{
					...item,
					quantity: 1,
				},
			]);
		},
		[products]
	);

	const removeProduct = useCallback((id: string) => {
		setProducts((prevState) =>
			prevState.filter((product) => product.id !== id)
		);
	}, []);

	const increment = useCallback((id: string) => {
		setProducts((prevState) => {
			const productIndex = prevState.findIndex((product) => product.id === id);

			const currentProducts = [...prevState];
			const currentProduct = currentProducts[productIndex];

			currentProducts[productIndex] = {
				...currentProduct,
				quantity: currentProduct.quantity + 1,
			};

			return currentProducts;
		});
	}, []);

	const decrement = useCallback((id: string) => {
		setProducts((prevState) => {
			const productIndex = prevState.findIndex((product) => product.id === id);

			const currentProducts = [...prevState];
			const currentProduct = currentProducts[productIndex];

			if (currentProducts[productIndex].quantity > 1) {
				currentProducts[productIndex] = {
					...currentProduct,
					quantity: currentProduct.quantity - 1,
				};
			}

			return currentProducts;
		});
	}, []);

	const totalAmount = useMemo(() => {
		const total = products.reduce((acc, product) => {
			return acc + product.unitAmount * product.quantity;
		}, 0);

		const totalFormatted = new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(total / 100);

		return totalFormatted;
	}, [products]);

	const value = useMemo(() => {
		return {
			addProduct,
			removeProduct,
			decrement,
			increment,
			products,
			totalAmount,
		};
	}, [addProduct, decrement, increment, products, removeProduct, totalAmount]);

	return (
		<CartShoppingContext.Provider value={value}>
			{children}
		</CartShoppingContext.Provider>
	);
}

export const useCartShoppingContext = () => {
	const context = useContext(CartShoppingContext);

	if (!context) {
		throw new Error(
			'useCartShoppingContext must be used within a CartShoppingProvider'
		);
	}

	return context;
};
