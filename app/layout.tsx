import { Karla, Markazi_Text } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import type { PropsWithChildren } from 'react';

const karla = Karla({
	subsets: ['latin'],
	variable: '--font-karla',
	display: 'swap',
});

const markaziText = Markazi_Text({
	subsets: ['latin'],
	variable: '--font-markazi',
	display: 'swap',
});

export const metadata = {
	title: 'Little Llama | Pet Adoption',
	description: 'Find, foster, and adopt your new best friend with Little Llama.',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en' className={`${karla.variable} ${markaziText.variable}`}>
			<body><Providers>{children}</Providers></body>
		</html>
	);
}
