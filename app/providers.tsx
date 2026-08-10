'use client';

import { useEffect } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MotionConfig } from 'motion/react';
import i18n from '../src/utils/i18n';
import type { PropsWithChildren } from 'react';

const headingFontFamily = 'var(--font-heading), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Georgia, serif';
const desktopHeading = '@media (min-width:900px)';

const theme = createTheme({
	cssVariables: { colorSchemeSelector: 'class' },
	colorSchemes: {
		light: {
			palette: {
				primary: { light: '#e3f3ef', main: '#087f75', dark: '#075e57', contrastText: '#fff' },
				secondary: { light: '#ffe7a3', main: '#f6bd3b', dark: '#bd7911', contrastText: '#18201f' },
				background: { default: '#fbfaf6', paper: '#ffffff' },
				text: { primary: '#18201f', secondary: '#5f6b69' },
			},
		},
		dark: {
			palette: {
				primary: { light: '#80d7ce', main: '#4db6ac', dark: '#1f8078', contrastText: '#081311' },
				secondary: { light: '#ffe29a', main: '#f6c453', dark: '#c28c1d', contrastText: '#18130a' },
				background: { default: '#101615', paper: '#18201f' },
				text: { primary: '#f4f7f6', secondary: '#b7c2c0' },
				divider: 'rgba(244,247,246,.14)',
			},
		},
	},
	shape: { borderRadius: 16 },
	typography: {
		fontFamily: 'var(--font-karla), var(--font-script-primary), var(--font-script-secondary), var(--font-script-tertiary), var(--font-script-quaternary), Arial, sans-serif',
		fontSize: 16,
		body1: { fontSize: '1rem', lineHeight: 1.6 },
		h1: { fontFamily: headingFontFamily, fontSize: '3.1rem', fontWeight: 700, lineHeight: 0.98, [desktopHeading]: { fontSize: '4.5rem' } },
		h2: { fontFamily: headingFontFamily, fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.04, [desktopHeading]: { fontSize: '3.4rem' } },
		h3: { fontFamily: headingFontFamily, fontSize: '2.25rem', fontWeight: 650, lineHeight: 1.08, [desktopHeading]: { fontSize: '2.7rem' } },
		h4: { fontFamily: headingFontFamily, fontSize: '1.8rem', fontWeight: 650, lineHeight: 1.16, [desktopHeading]: { fontSize: '2rem' } },
		h5: { fontFamily: headingFontFamily, fontSize: '1.35rem', fontWeight: 650, lineHeight: 1.2 },
		h6: { fontFamily: headingFontFamily, fontSize: '1.125rem', fontWeight: 650, lineHeight: 1.25 },
		button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
	},
	components: {
		MuiButton: {
			defaultProps: { disableElevation: true },
			styleOverrides: { root: { borderRadius: 999, paddingInline: 22, minHeight: 44, transition: 'background-color 180ms ease, border-color 180ms ease, color 180ms ease, transform 180ms ease', '&:active': { transform: 'translateY(1px)' } } },
		},
		MuiCard: { styleOverrides: { root: { border: '1px solid var(--mui-palette-divider)', borderRadius: 16 } } },
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

	return <AppRouterCacheProvider options={{ enableCssLayer: true }}><ThemeProvider theme={theme} defaultMode='system' disableTransitionOnChange><CssBaseline /><MotionConfig reducedMotion='user'>{children}</MotionConfig></ThemeProvider></AppRouterCacheProvider>;
}
