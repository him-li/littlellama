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
} from '@/src/ui/mui';
import { useSpring, animated } from '@react-spring/web';
import { POST } from '../../../utils/api';
import littleLlama from '../../../assets/littleLlama.png';

const Fade = React.forwardRef(function Fade(props: any, ref: any) {
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

	const handleSignup = async (e) => {
		e.preventDefault();
		const body = {
			firstName,
			lastName,
			email,
			phone,
			password,
		};
		const data = await POST('/signup', body);
		if (data) {
			setOpenSuccess(true);
			setTimeout(async () => {
				handleClose();
			}, 1000);
		} else {
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
							{t('button-signup')}
						</Typography>
						<Box component='form' noValidate sx={{ mt: 3 }}>
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
										error={
											email !== '' &&
											!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
										}
										helperText={
											email !== '' &&
											!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
												? t('para-invalid-email')
												: ''
										}
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
										label='I want to receive inspiration, marketing promotions and updates via email.'
									/>
								</Grid>
							</Grid>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='secondary'
								onClick={handleSignup}
								sx={{ mt: 3, mb: 2 }}
								disabled={
									password !== confirmPassword ||
									firstName === '' ||
									lastName === '' ||
									email === '' ||
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
									password === '' ||
									confirmPassword === ''
								}
							>
								{t('button-signup')}
							</Button>
							<Grid container sx={{ justifyContent: 'flex-end' }}>
								<Grid size='auto'>
									<Link href='#' variant='body2'>
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
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
					Welcome to join the Little Llama {firstName}!
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='error'>
					Oops! Something went wrong. Please try to sign up again later.
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
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
};
