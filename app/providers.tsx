'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/utils/i18n';
import type { PropsWithChildren } from 'react';

const theme = createTheme({
	cssVariables: true,
	shape: { borderRadius: 16 },
	typography: {
		fontFamily: 'var(--font-karla), Arial, sans-serif',
		h1: { fontFamily: 'var(--font-markazi), Georgia, serif', fontWeight: 700, lineHeight: 0.95 },
		h2: { fontFamily: 'var(--font-markazi), Georgia, serif', fontWeight: 700, lineHeight: 1 },
		h3: { fontFamily: 'var(--font-markazi), Georgia, serif', fontWeight: 650, lineHeight: 1.08 },
		h4: { fontFamily: 'var(--font-markazi), Georgia, serif', fontWeight: 650 },
		button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
	},
	palette: {
		mode: 'light',
		primary: { light: '#e3f3ef', main: '#087f75', dark: '#075e57', contrastText: '#fff' },
		secondary: { light: '#ffe7a3', main: '#f6bd3b', dark: '#bd7911', contrastText: '#18201f' },
		background: { default: '#fbfaf6', paper: '#ffffff' },
		text: { primary: '#18201f', secondary: '#5f6b69' },
	},
	components: {
		MuiButton: {
			defaultProps: { disableElevation: true },
			styleOverrides: { root: { borderRadius: 999, paddingInline: 22, minHeight: 44 } },
		},
		MuiCard: { styleOverrides: { root: { border: '1px solid rgba(24,32,31,.08)' } } },
		MuiTextField: { defaultProps: { variant: 'outlined' } },
	},
});

export default function Providers({ children }: PropsWithChildren) {
	return <AppRouterCacheProvider options={{ enableCssLayer: true }}><ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider></AppRouterCacheProvider>;
}
