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

export default function Login({ open, handleClose }: any) {
	const { t } = useTranslation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [error, setError] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const { token } = await POST('/login', { email, password });
			localStorage.setItem('USER', JSON.stringify(token));
			console.log('Token saved in localStorage:', localStorage.getItem('USER'));
			if (localStorage.getItem('USER')) {
				setOpenSuccess(true);
				setTimeout(async () => {
					handleClose();
					window.location.reload();
				}, 1000);
			} else {
				setOpenError(true);
			}
		} catch (error) {
			console.log(error.response.data);
			setError(error.response.data.message);
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
							{t('button-login')}
						</Typography>
						<Box component='form' noValidate sx={{ mt: 1 }}>
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
								error={
									email !== '' &&
									!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
								}
								helperText={
									email !== '' &&
									!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
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
								label='Remember me'
							/>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='secondary'
								onClick={handleLogin}
								sx={{ mt: 3, mb: 2 }}
								disabled={
									email === '' ||
									!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
									password === ''
								}
							>
								{t('button-login')}
							</Button>
							<Grid container>
								<Grid size='grow'>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid size='auto'>
									<Link href='#' variant='body2' color='secondary'>
										{"Don't have an account? Sign Up"}
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
					You have been successfully logged in!
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
						: 'Oops! Something went wrong. Please try to log in again later.'}
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
	color: 'black',
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
	marginTop: 8,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};
