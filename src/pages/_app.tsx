import Header from 'components/Header';
import type { AppProps } from 'next/app';

import { globalStyles } from 'styles/global';

import * as S from 'styles/_app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<S.Container>
			<Header />

			<Component {...pageProps} />
		</S.Container>
	);
}
