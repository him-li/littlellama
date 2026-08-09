import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
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
} from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { PUT } from '../../../utils/api';
import littleLlama from '../../../assets/littleLlama.png';

const Fade = React.forwardRef(function Fade(props, ref) {
	const {
		children,
		in: open,
		onClick,
		onEnter,
		onExited,
		// eslint-disable-next-line no-unused-vars
		ownerState,
		...other
	} = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter(null, true);
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited(null, true);
			}
		},
	});
	return (
		<animated.div ref={ref} style={style} {...other}>
			{React.cloneElement(children, { onClick })}
		</animated.div>
	);
});

export default function ProfileSettings({ open, handleClose, user }) {
	const { t } = useTranslation();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [bio, setBio] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);

	const handleUpdateUser = async (e) => {
		e.preventDefault();
		const updatedUser = {
			id: user.id,
			firstname: firstName || user.firstname,
			lastname: lastName || user.lastname,
			email: email || user.email,
			phone: phone || user.phone,
			password: password || user.password,
			bio,
		};
		try {
			await PUT(`/user/${user.id}`, updatedUser);
			setTimeout(async () => {
				setOpenSuccess(true);
				handleClose();
				window.location.reload();
			}, 1000);
		} catch (error) {
			setOpenError(true);
			console.error('Error updating user:', error);
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
				aria-labelledby='spring-modal-title'
				aria-describedby='spring-modal-description'
				keepMounted
				open={open}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						TransitionComponent: Fade,
					},
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<img src={littleLlama.src} height={75} alt='' />
						</Avatar>
						<Typography component='h1' variant='h5'>
							{t('profile-settings')}
						</Typography>
						<Box component='form' noValidate sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete='given-name'
										name='firstName'
										color='secondary'
										fullWidth
										id='firstName'
										label={t('para-firstname')}
										placeholder={user.firstname}
										autoFocus
										onChange={(e) => setFirstName(e.target.value)}
										value={firstName}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										color='secondary'
										fullWidth
										id='lastName'
										label={t('para-lastname')}
										placeholder={user.lastname}
										name='lastName'
										autoComplete='family-name'
										onChange={(e) => setLastName(e.target.value)}
										value={lastName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										color='secondary'
										fullWidth
										id='email'
										label={t('para-email')}
										placeholder={user.email}
										name='email'
										autoComplete='email'
										onChange={(e) => setEmail(e.target.value)}
										value={email}
									/>
								</Grid>
								<Grid item xs={12}>
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
								<Grid item xs={12}>
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
									/>
								</Grid>
								<Grid item xs={12} sm={12}>
									<TextField
										color='secondary'
										fullWidth
										id='bio'
										label={t('para-bio')}
										placeholder={user.bio}
										name='bio'
										onChange={(e) => setBio(e.target.value)}
										value={bio}
									/>
								</Grid>
							</Grid>
							<Button
								type='button'
								fullWidth
								variant='contained'
								color='secondary'
								onClick={handleUpdateUser}
								sx={{ mt: 3, mb: 2 }}
							>
								{t('button-save-changes')}
							</Button>
						</Box>
					</Box>
				</Fade>
			</Modal>
			<Snackbar
				open={openSuccess}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='success'>
					Your profile has been updated successfully!
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='error'>
					Oops! Something went wrong. Please try to update again later.
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

ProfileSettings.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	user: PropTypes.object || PropTypes.string,
};

Fade.propTypes = {
	children: PropTypes.element.isRequired,
	in: PropTypes.bool,
	onClick: PropTypes.any,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
	ownerState: PropTypes.any,
};

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	color: 'black',
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
	marginTop: 8,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};
