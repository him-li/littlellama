import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Backdrop,
	Box,
	Modal,
	Button,
	Avatar,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Typography,
	Snackbar,
	Alert,
	Grow,
} from '@/src/ui/mui';
import { getApiErrorMessage, POST } from '../../../utils/api';
import littleLlama from '../../../assets/littleLlama.png';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

export default function Signup({ open, handleClose }: any) {
	const { t } = useTranslation();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');
	const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
	const passwordValid = password.length >= 8;

	const handleSignup = async (e) => {
		e.preventDefault();
		const body = {
			firstName,
			lastName,
			email,
			phone,
			password,
			confirmPassword,
		};
		try {
			const { token } = await POST<{ token: string }>('/signup', body);
			localStorage.setItem('USER', JSON.stringify(token));
			setOpenSuccess(true);
			window.setTimeout(() => {
				handleClose();
				window.location.reload();
			}, 1000);
		} catch (requestError) {
			setError(getApiErrorMessage(requestError, t('message-signup-error')));
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
				aria-labelledby='signup'
				aria-describedby='signup'
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
							{t('button-signup')}
						</Typography>
						<Box component='form' onSubmit={handleSignup} noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid size={{ xs: 12, sm: 6 }}>
									<TextField
										autoComplete='given-name'
										name='firstName'
										required
										color='secondary'
										fullWidth
										id='firstName'
										label={t('para-firstname')}
										autoFocus
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
									/>
								</Grid>
								<Grid size={{ xs: 12, sm: 6 }}>
									<TextField
										required
										color='secondary'
										fullWidth
										id='lastName'
										label={t('para-lastname')}
										name='lastName'
										autoComplete='family-name'
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
									/>
								</Grid>
								<Grid size={12}>
									<TextField
										required
										color='secondary'
										fullWidth
										id='email'
										label={t('para-email')}
										name='email'
										autoComplete='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
										error={email !== '' && !emailValid}
										helperText={
											email !== '' && !emailValid
												? t('para-invalid-email')
												: ''
										}
									/>
								</Grid>
								<Grid size={12}>
									<TextField
										required
										color='secondary'
										fullWidth
										name='phone'
										label={t('para-phone')}
										type='text'
										id='phone'
										autoComplete='phone-number'
										onChange={(e) => setPhone(e.target.value)}
										value={phone}
									/>
								</Grid>
								<Grid size={12}>
									<TextField
										required
										color='secondary'
										fullWidth
										name='password'
										label={t('para-password')}
										type='password'
										id='password'
										autoComplete='new-password'
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										error={password !== '' && !passwordValid}
										helperText={password !== '' && !passwordValid ? t('para-password-too-short') : ''}
									/>
								</Grid>
								<Grid size={12}>
									<TextField
										required
										color='secondary'
										fullWidth
										name='confirmPassword'
										label={t('para-confirm-password')}
										type='password'
										id='confirmPassword'
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										error={password !== confirmPassword}
										helperText={
											password !== confirmPassword
												? t('para-password-not-match')
												: null
										}
									/>
								</Grid>
								<Grid size={12}>
									<FormControlLabel
										control={
											<Checkbox value='allowExtraEmails' color='secondary' />
										}
										label={t('marketing-opt-in')}
									/>
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								startIcon={<PersonAddAltRoundedIcon />}
								color='secondary'
								sx={{ mt: 3, mb: 2 }}
								disabled={
									password !== confirmPassword ||
									firstName === '' ||
									lastName === '' ||
									email === '' ||
									!emailValid ||
									phone.trim() === '' ||
									!passwordValid ||
									confirmPassword === ''
								}
							>
								{t('button-signup')}
							</Button>
							<Grid container sx={{ justifyContent: 'flex-end' }}>
								<Grid size='auto'>
									<Link href='#' variant='body2'>
									{t('already-account')}
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
					{t('message-signup-success', { name: firstName })}
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='error'>
					{error || t('message-signup-error')}
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}



const style = {
	marginTop: 8,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	color: 'black',
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};
