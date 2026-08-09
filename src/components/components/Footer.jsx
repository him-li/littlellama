import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, Container, Link, NativeSelect } from '@mui/material';
import i18n from '../../utils/i18n';

export default function Footer() {
	const { t } = useTranslation();
	const [language, setLanguage] = useState('en');

	const chooseLanguage = (e) => {
		e.preventDefault();
		i18n.changeLanguage(e.target.value); // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
		setLanguage(e.target.value);
	};
	return (
		<Box
			component='footer'
			sx={{
				py: 3,
				px: 2,
				mt: 'auto',
				backgroundColor: (theme) =>
					theme.palette.mode === 'light'
						? theme.palette.grey[200]
						: theme.palette.grey[800],
			}}
		>
			<Container maxWidth='sm'>
				<Typography variant='body' fontFamily='Markazi Text' color='teal'>
					{'Copyright © '}
					<Link color='inherit' href='/'>
						{t('heading-little-llama')}
					</Link>{' '}
					{new Date().getFullYear()}
					{t('para-xin')}
				</Typography>
				<NativeSelect
					defaultValue='Select Language'
					inputProps={{
						name: 'adoption_status',
						id: 'adoption_status',
					}}
					onChange={chooseLanguage}
					color='success'
				>
					<option disabled style={{ textAlign: 'center' }}>
						Select Language
					</option>
					<option value={'en'} style={{ textAlign: 'center' }}>
						English
					</option>
					<option value={'zh_hans'} style={{ textAlign: 'center' }}>
						简体中文
					</option>
					<option value={'zh_hant'} style={{ textAlign: 'center' }}>
						正體中文
					</option>
					<option value={'he'} style={{ textAlign: 'center' }}>
						עברית
					</option>
				</NativeSelect>
			</Container>
		</Box>
	);
}
