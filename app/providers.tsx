'use client';

import { useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import i18n from '../src/utils/i18n';
import type { PropsWithChildren } from 'react';

const theme = createTheme({
	cssVariables: true,
	shape: { borderRadius: 16 },
	typography: {
		fontFamily: 'var(--font-karla), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Arial, sans-serif',
		h1: { fontFamily: 'var(--font-heading), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Georgia, serif', fontWeight: 700, lineHeight: 0.95 },
		h2: { fontFamily: 'var(--font-heading), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Georgia, serif', fontWeight: 700, lineHeight: 1 },
		h3: { fontFamily: 'var(--font-heading), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Georgia, serif', fontWeight: 650, lineHeight: 1.08 },
		h4: { fontFamily: 'var(--font-heading), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Georgia, serif', fontWeight: 650 },
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
		MuiCard: { styleOverrides: { root: { border: '1px solid rgba(24,32,31,.08)', borderRadius: 16 } } },
		MuiPaper: { styleOverrides: { rounded: { borderRadius: 16 } } },
		MuiModal: { styleOverrides: { root: { '& > .MuiBox-root': { borderRadius: 16 } } } },
		MuiTextField: { defaultProps: { variant: 'outlined' } },
		MuiOutlinedInput: {
			styleOverrides: {
				root: { minHeight: 56 },
				input: { paddingTop: 16.5, paddingBottom: 16.5 },
			},
		},
	},
});

export default function Providers({ children }: PropsWithChildren) {
	useEffect(() => {
		const syncDocumentLanguage = (language: string) => {
			const htmlLanguage = language === 'zh_hans' ? 'zh-Hans' : language === 'zh_hant' ? 'zh-Hant' : language.split('-')[0];
			const direction = ['ar', 'he'].includes(htmlLanguage) ? 'rtl' : 'ltr';
			document.documentElement.lang = htmlLanguage;
			document.documentElement.dir = direction;
			document.body.dir = direction;
			localStorage.setItem('littlellama-language', language);
		};

		syncDocumentLanguage(i18n.language);
		i18n.on('languageChanged', syncDocumentLanguage);
		return () => { i18n.off('languageChanged', syncDocumentLanguage); };
	}, []);

	return <AppRouterCacheProvider options={{ enableCssLayer: true }}><ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider></AppRouterCacheProvider>;
}
