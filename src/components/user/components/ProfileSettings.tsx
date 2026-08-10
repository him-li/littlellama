import React, { useState, type FormEvent, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Backdrop,
	Box,
	Modal,
	Button,
	Avatar,
	TextField,
	Typography,
	Grid,
	Alert,
	Snackbar,
	Grow,
} from '@/src/ui/mui';
import { getApiErrorMessage, PUT } from '../../../utils/api';
import littleLlama from '../../../assets/littleLlama.png';
import type { ModalProps, User } from '../../../types/models';

interface ProfileSettingsProps extends ModalProps {
	user: User;
	handleClose: () => void;
}

export default function ProfileSettings({ open, handleClose, user }: ProfileSettingsProps) {
	const { t } = useTranslation();
	const [firstName, setFirstName] = useState(user.firstname ?? user.firstName ?? '');
	const [lastName, setLastName] = useState(user.lastname ?? '');
	const [email, setEmail] = useState(user.email ?? '');
	const [phone, setPhone] = useState(user.phone ?? '');
	const [password, setPassword] = useState('');
	const [bio, setBio] = useState(user.bio ?? '');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');

	const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const updatedUser = {
			firstname: firstName.trim(),
			lastname: lastName.trim(),
			email: email.trim(),
			phone: phone.trim(),
			bio,
			...(password ? { password } : {}),
		};
		try {
			await PUT(`/user/${user.id}`, updatedUser);
			setOpenSuccess(true);
			window.setTimeout(() => {
				handleClose();
				window.location.reload();
			}, 1000);
		} catch (requestError) {
			setError(getApiErrorMessage(requestError, t('message-profile-error')));
			setOpenError(true);
		}
	};

	const handleCloseAlert = (_event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSuccess(false);
		setOpenError(false);
	};

	return (
		<React.Fragment>
			<Modal
				aria-labelledby='spring-modal-title'
				aria-describedby='spring-modal-description'
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
							{t('profile-settings')}
						</Typography>
						<Box component='form' onSubmit={handleUpdateUser} noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid size={{ xs: 12, sm: 6 }}>
									<TextField
										autoComplete='given-name'
										name='firstName'
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
										color='secondary'
										fullWidth
										id='email'
										label={t('para-email')}
										name='email'
										autoComplete='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
									/>
								</Grid>
								<Grid size={12}>
									<TextField
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
										color='secondary'
										fullWidth
										name='password'
										label={t('para-password')}
										type='password'
										id='password'
										autoComplete='new-password'
										onChange={(e) => setPassword(e.target.value)}
										value={password}
										error={password !== '' && password.length < 8}
										helperText={password !== '' && password.length < 8 ? t('para-password-too-short') : ''}
									/>
								</Grid>
								<Grid size={12}>
									<TextField
										color='secondary'
										fullWidth
										id='bio'
										label={t('para-bio')}
										name='bio'
										onChange={(e) => setBio(e.target.value)}
										value={bio}
									/>
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='secondary'
								sx={{ mt: 3, mb: 2 }}
								disabled={!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || (password !== '' && password.length < 8)}
							>
								{t('button-save-changes')}
							</Button>
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
					{t('message-profile-success')}
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='error'>
					{error || t('message-profile-error')}
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
