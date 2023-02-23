import Header from 'components/Header';
import type { AppProps } from 'next/app';

import { CartShoppingProvider } from 'hooks/useCartShoppingContext';

import { globalStyles } from 'styles/global';
import * as S from 'styles/_app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<S.Container>
			<CartShoppingProvider>
				<S.Container>
					<S.Content>
						<Header />
						<Component {...pageProps} />
					</S.Content>
				</S.Container>
			</CartShoppingProvider>
		</S.Container>
	);
}
