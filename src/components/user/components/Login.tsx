import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Backdrop,
	Box,
	Modal,
	Button,
	Avatar,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Link,
	Typography,
	Snackbar,
	Alert,
	Grow,
} from '@/src/ui/mui';
import { getApiErrorMessage, POST } from '../../../utils/api';
import littleLlama from '../../../assets/littleLlama.png';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

export default function Login({ open, handleClose }: any) {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { token } = await POST('/login', { email, password });
			localStorage.setItem('USER', JSON.stringify(token));
			setOpenSuccess(true);
			window.setTimeout(() => {
				handleClose();
				window.location.reload();
			}, 1000);
		} catch (requestError) {
			setError(getApiErrorMessage(requestError, t('message-login-error')));
			setOpenError(true);
		}
	};

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSuccess(false);
		setOpenError(false);
	};

	return (
		<React.Fragment>
			<Modal
				aria-labelledby='login'
				aria-describedby='login'
				keepMounted
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
			>
				<Grow in={open} timeout={{ enter: 280, exit: 180 }}>
					<Box sx={style}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<Box component='img' src={littleLlama.src} height={75} alt='' />
						</Avatar>
						<Typography component='h1' variant='h5'>
							{t('button-login')}
						</Typography>
						<Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
							<TextField
								margin='normal'
								color='secondary'
								required
								fullWidth
								id='email'
								label={t('para-email')}
								name='email'
								autoComplete='email'
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
								value={email}
								error={email !== '' && !emailValid}
								helperText={
									email !== '' && !emailValid
										? t('para-invalid-email')
										: ''
								}
							/>
							<TextField
								margin='normal'
								color='secondary'
								required
								fullWidth
								name='password'
								label={t('para-password')}
								type='password'
								id='password'
								autoComplete='current-password'
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<FormControlLabel
								control={<Checkbox value='remember' color='secondary' />}
								label={t('remember-me')}
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								startIcon={<LoginRoundedIcon />}
								color='secondary'
								sx={{ mt: 3, mb: 2 }}
								disabled={
									email === '' ||
									!emailValid ||
									password === ''
								}
							>
								{t('button-login')}
							</Button>
							<Grid container>
								<Grid size='grow'>
									<Link href='#' variant='body2'>
										{t('forgot-password')}
									</Link>
								</Grid>
								<Grid size='auto'>
									<Link href='#' variant='body2' color='secondary'>
										{t('no-account')}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Grow>
			</Modal>
			<Snackbar
				open={openSuccess}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='success'>
					{t('message-login-success')}
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='error'>
					{error
						? error
						: t('message-login-error')}
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}



const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	color: 'text.primary',
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
	marginTop: 8,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};
