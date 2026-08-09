import { Heebo, Karla, Markazi_Text, Noto_Sans_Arabic } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import type { PropsWithChildren } from 'react';

const karla = Karla({
	subsets: ['latin'],
	variable: '--font-karla',
	display: 'swap',
});

const markaziText = Markazi_Text({
	subsets: ['arabic', 'latin'],
	variable: '--font-markazi',
	display: 'swap',
});

const heebo = Heebo({ subsets: ['hebrew', 'latin'], variable: '--font-heebo', display: 'swap' });
const notoSansArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });

export const metadata = {
	title: 'Little Llama | Pet Adoption',
	description: 'Find, foster, and adopt your new best friend with Little Llama.',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en' className={`${karla.variable} ${markaziText.variable} ${heebo.variable} ${notoSansArabic.variable}`}>
			<body><Providers>{children}</Providers></body>
		</html>
	);
}
