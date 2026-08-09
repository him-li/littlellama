import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Box,
	Stack,
	Typography,
	Button,
	Link,
	Grid,
	Snackbar,
	Alert,
} from '@/src/ui/mui';
import Signup from './components/Signup';
import Login from './components/Login';
import PetsList from '../pet/components/PetsList';
import ProfileSettings from './components/ProfileSettings';
import { GET } from '../../utils/api';
import heroImage from '../../assets/your-pet-included.jpg';
import type { Pet, User } from '../../types/models';

export default function Home({ user }: { user: User | null }) {
	const { t } = useTranslation();
	const [petsData, setPetsData] = useState<Pet[]>([]);
	const [openSignup, setOpenSignup] = useState(false);
	const [openLogin, setOpenLogin] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [openProfile, setOpenProfile] = useState(false);

	useEffect(() => {
		fetchPetsData();
	}, []);

	const fetchPetsData = async () => {
		try {
			const res = await GET<Pet[]>('/pet');
			setPetsData(res);
		} catch (error) {
			console.error('Error fetching pets data:', error);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('USER');
		console.log(user, localStorage.getItem('USER'));
		if (localStorage.getItem('USER') === null) {
			setOpenSuccess(true);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			setOpenError(true);
		}
	};

	const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenError(false);
		setOpenSuccess(false);
	};

	return (
		<React.Fragment>
			<Signup open={openSignup} handleClose={() => setOpenSignup(false)} />
			<Login open={openLogin} handleClose={() => setOpenLogin(false)} />
			{user && (
				<ProfileSettings
					open={openProfile}
					handleClose={() => setOpenProfile(false)}
					user={user}
				/>
			)}
			<Box component='center' height='100%'>
				<Box
					sx={{ backgroundColor: 'teal' }}
					minHeight='50vh'
					display='flex'
					justifyContent='center'
					alignItems='center'
				>
					<Grid
						container
						height='100%'
						maxWidth='md'
						padding={2}
						gap={4}
						justifyContent='center'
					>
						<Grid item xs={6} md={7}>
							<Stack gap={2}>
								<Typography
									variant='h1'
									fontFamily='Markazi Text'
									color='secondary'
									align='left'
								>
									{user
										? `${t('heading-hey')} ${user.firstname}!`
										: `${t('heading-little-llama')}`}
								</Typography>
								<Typography variant='h3' fontFamily='Markazi Text' align='left'>
									{user
										? `${t('heading-welcome')}`
										: `${t('heading-pet-adoption')}`}
								</Typography>
								<Typography align='left' paragraph>
									{t('para-home')}
								</Typography>
								{user ? (
									<Stack direction='row' justifyContent='flex-start' gap={5}>
										<Button
											variant='contained'
											size='large'
											onClick={() => setOpenProfile(true)}
											color='secondary'
										>
											{t('profile-settings')}
										</Button>
										<Button
											variant='contained'
											size='large'
											onClick={handleLogout}
											color='secondary'
										>
											{t('button-logout')}
										</Button>
									</Stack>
								) : (
									<Stack direction='row' justifyContent='flex-start' gap={5}>
										<Button
											variant='contained'
											size='large'
											onClick={() => setOpenLogin(true)}
											color='secondary'
										>
											{t('button-login')}
										</Button>
										<Button
											variant='contained'
											size='large'
											onClick={() => setOpenSignup(true)}
											color='secondary'
										>
											{t('button-signup')}
										</Button>
									</Stack>
								)}
							</Stack>
						</Grid>
						<Grid item flexGrow={1} xs='auto' md={4} position='relative'>
							<img
								src={heroImage.src}
								width='100%'
								style={{
									borderRadius: 5,
									boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
									position: 'absolute',
									top: '50%',
									left: '0',
								}}
							/>
						</Grid>
					</Grid>
				</Box>
				<Box maxWidth='md' padding={2} m={4} justifyContent='center'>
					<Stack
						direction='row'
						justifyContent='space-evenly'
						alignItems='center'
					>
						<Typography variant='h2' fontFamily='Markazi Text' color='black'>
							{t('heading-petlist-home')}
						</Typography>
						<Button
							variant='contained'
							size='large'
							color='secondary'
							sx={{ height: '65%' }}
						>
							<Link href='/search' underline='none' color='black'>
								{t('text-search')}
							</Link>
						</Button>
					</Stack>
					<PetsList petsData={petsData} hide={true} user={user} />
				</Box>
			</Box>
			<Snackbar
				open={openSuccess}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='success'>
					You have been successfully logged out!
				</Alert>
			</Snackbar>
			<Snackbar
				open={openError}
				autoHideDuration={6000}
				onClose={handleCloseAlert}
			>
				<Alert onClose={handleCloseAlert} severity='error'>
					Oops! Something went wrong. Please try to log out again later.
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}
