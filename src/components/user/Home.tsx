import { useEffect, useState, type SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Button, Chip, Container, Snackbar, Stack, Typography } from '@/src/ui/mui';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
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
	const [openProfile, setOpenProfile] = useState(false);

	useEffect(() => { void GET<Pet[]>('/pet').then(setPetsData).catch(console.error); }, []);
	const handleLogout = () => {
		localStorage.removeItem('USER');
		setOpenSuccess(true);
		window.setTimeout(() => window.location.reload(), 700);
	};
	const closeAlert = (_event?: SyntheticEvent | Event, reason?: string) => { if (reason !== 'clickaway') setOpenSuccess(false); };

	return (
		<>
			<Signup open={openSignup} handleClose={() => setOpenSignup(false)} />
			<Login open={openLogin} handleClose={() => setOpenLogin(false)} />
			{user && openProfile && <ProfileSettings open handleClose={() => setOpenProfile(false)} user={user} />}

			<Box component='section' sx={{ position: 'relative', overflow: 'hidden', bgcolor: 'primary.dark', color: 'white', py: { xs: 7, md: 11 } }}>
				<Box sx={{ position: 'absolute', inset: 0, opacity: .16, backgroundImage: 'radial-gradient(circle at 15% 20%, #fff 0 2px, transparent 3px)', backgroundSize: '34px 34px' }} />
				<Container maxWidth='lg' sx={{ position: 'relative' }}>
					<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0,1.08fr) minmax(360px,.92fr)' }, alignItems: 'center', gap: { xs: 5, md: 8 } }}>
						<Stack spacing={2.5} sx={{ alignItems: 'flex-start' }}>
							<Chip icon={<FavoriteRoundedIcon />} label={t('chip-adopt')} sx={{ bgcolor: 'rgba(255,255,255,.14)', color: 'white', '& .MuiChip-icon': { color: 'secondary.main' } }} />
							<Typography variant='h1' sx={{ fontSize: { xs: '3.5rem', sm: '4.8rem', md: '5.8rem' }, maxWidth: 680 }}>
								{user ? `${t('heading-hey')} ${[user.firstname ?? user.firstName, user.lastname].filter(Boolean).join(' ')}!` : t('heading-little-llama')}
							</Typography>
							<Typography variant='h4' sx={{ color: 'secondary.light', fontSize: { xs: '1.8rem', md: '2.3rem' } }}>
								{user ? t('heading-welcome') : t('heading-pet-adoption')}
							</Typography>
							<Typography sx={{ maxWidth: 610, color: 'rgba(255,255,255,.8)', fontSize: { xs: '1rem', md: '1.12rem' } }}>{t('para-home')}</Typography>
							<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ pt: 1, width: { xs: '100%', sm: 'auto' } }}>
								{user ? <><Button variant='contained' color='secondary' onClick={() => setOpenProfile(true)}>{t('profile-settings')}</Button><Button variant='outlined' onClick={handleLogout} sx={{ color: 'white', borderColor: 'rgba(255,255,255,.5)' }}>{t('button-logout')}</Button></> : <><Button variant='contained' color='secondary' onClick={() => setOpenSignup(true)} endIcon={<ArrowForwardRoundedIcon />}>{t('button-signup')}</Button><Button variant='outlined' onClick={() => setOpenLogin(true)} sx={{ color: 'white', borderColor: 'rgba(255,255,255,.5)' }}>{t('button-login')}</Button></>}
							</Stack>
						</Stack>
						<Box sx={{ position: 'relative', '&::before': { content: '""', position: 'absolute', inset: { xs: -12, md: -18 }, border: '1px solid rgba(255,255,255,.22)', borderRadius: '32px', transform: 'rotate(3deg)' } }}>
							<Box component='img' src={heroImage.src} alt='A happy adopted pet with its family' sx={{ position: 'relative', width: '100%', height: { xs: 330, md: 500 }, objectFit: 'cover', borderRadius: '26px', boxShadow: '0 28px 70px rgba(0,0,0,.3)' }} />
						</Box>
					</Box>
				</Container>
			</Box>

			<Box component='section' sx={{ py: { xs: 7, md: 10 } }}>
				<Container maxWidth='lg'>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-end' } }}>
						<Box><Typography color='primary.main' fontWeight={800} sx={{ mb: .5 }}>{t('heading-meet-friend')}</Typography><Typography variant='h2' sx={{ fontSize: { xs: '2.8rem', md: '3.8rem' } }}>{t('heading-petlist-home')}</Typography></Box>
						<Button href='/search' variant='outlined' startIcon={<SearchRoundedIcon />}>{t('text-search')}</Button>
					</Stack>
					<PetsList petsData={petsData.slice(0, 6)} hide user={user} />
				</Container>
			</Box>
			<Snackbar open={openSuccess} autoHideDuration={4000} onClose={closeAlert}><Alert onClose={closeAlert} severity='success'>{t('message-logout-success')}</Alert></Snackbar>
		</>
	);
}
