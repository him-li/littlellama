import { Assistant, IBM_Plex_Sans_Arabic, Karla, Lora, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import type { PropsWithChildren } from 'react';

const karla = Karla({
	subsets: ['latin'],
	variable: '--font-karla',
	display: 'swap',
});

const heading = Lora({
	subsets: ['latin'],
	variable: '--font-heading',
	display: 'swap',
});

const simplifiedChinese = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-cjk-sc', display: 'swap' });
const traditionalChinese = Noto_Sans_TC({ subsets: ['latin'], variable: '--font-cjk-tc', display: 'swap' });
const assistant = Assistant({ subsets: ['hebrew', 'latin'], variable: '--font-hebrew', display: 'swap' });
const ibmPlexArabic = IBM_Plex_Sans_Arabic({ weight: ['400', '600', '700'], subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });

export const metadata = {
	title: 'Little Llama | Pet Adoption',
	description: 'Find, foster, and adopt your new best friend with Little Llama.',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang='en' suppressHydrationWarning className={`${karla.variable} ${heading.variable} ${simplifiedChinese.variable} ${traditionalChinese.variable} ${assistant.variable} ${ibmPlexArabic.variable}`}>
			<body><InitColorSchemeScript attribute='class' defaultMode='system' /><Providers>{children}</Providers></body>
		</html>
	);
}
