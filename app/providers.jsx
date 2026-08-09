'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, teal } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import '../src/utils/i18n';

const theme = createTheme({
	typography: { fontFamily: ['Karla Variable', 'sans-serif', 'Markazi Text Variable', 'serif'].join(',') },
	palette: {
		primary: { light: '#fff', main: '#fff', dark: '#b2b2b2', contrastText: '#111' },
		secondary: amber,
		success: teal,
	},
});

export default function Providers({ children }) {
	return <AppRouterCacheProvider options={{ enableCssLayer: true }}><ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider></AppRouterCacheProvider>;
}
