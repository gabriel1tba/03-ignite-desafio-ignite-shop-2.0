import Link from 'next/link';
import Image from 'next/image';

import logoImg from 'assets/logo.svg';

import * as S from './styles';

export default function Header() {
	return (
		<S.Container>
			<Link href='/'>
				<Image src={logoImg} alt='' />
			</Link>
		</S.Container>
	);
}
