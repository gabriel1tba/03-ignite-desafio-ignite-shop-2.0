import { styled } from 'styles';

export const Container = styled('main', {
	display: 'flex',
	minHeight: 656,
	maxWidth: 'calc(100vw - ((100vw - 1366px) / 2))',
	width: '100%',
});

export const Product = styled('section', {
	background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
	borderRadius: 8,
	cursor: 'pointer',
	position: 'relative',
	overflow: 'hidden',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover',
	},

	footer: {
		position: 'absolute',
		bottom: '0.25rem',
		left: '0.25rem',
		right: '0.25rem',
		padding: '2rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '.5rem',

		borderRadius: 6,
		background: 'rgba(0, 0, 0, 0.6)',

		transform: 'translateY(110%)',
		opacity: 0,
		transition: 'all 0.2s ease-in-out',

		strong: {
			fontSize: '$lg',
			color: '$gray100',
		},

		span: {
			fontSize: '$xl',
			fontWeight: 'bold',
			color: '$green300',
		},
	},

	'&:hover': {
		footer: {
			transform: 'translateY(0)',
			opacity: 1,
		},
	},
});
