import '@fontsource-variable/karla';
import '@fontsource-variable/markazi-text';
import './globals.css';
import Providers from './providers';
import type { PropsWithChildren } from 'react';

export const metadata = {
	title: 'Little Llama | Pet Adoption',
	description: 'Find, foster, and adopt your new best friend with Little Llama.',
};

export default function RootLayout({ children }: PropsWithChildren) {
	return <html lang='en'><body><Providers>{children}</Providers></body></html>;
}
