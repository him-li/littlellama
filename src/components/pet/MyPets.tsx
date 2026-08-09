import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Tab, Tabs, Typography } from '@/src/ui/mui';
import { GET } from '../../utils/api';
import PetsList from './components/PetsList';
import PetsPage from './Pets';
import type { Pet, User } from '../../types/models';

export default function MyPets({ user }: { user: User | null }) {
	const { t } = useTranslation();
	const [petsData, setPetsData] = useState<Pet[]>([]);
	const [tab, setTab] = useState(0);
	useEffect(() => { if (user?.id) void GET<Pet[]>(`/pet/user/${user.id}`).then(setPetsData).catch(console.error); }, [user]);
	if (!user) return <Container maxWidth='md' sx={{ py: 12, textAlign: 'center' }}><Typography variant='h2'>{t('mypets-login-required')}</Typography></Container>;
	return (
		<Box>
			<Box sx={{ bgcolor: 'primary.light', py: { xs: 5, md: 7 } }}><Container maxWidth='lg'><Typography color='primary.main' fontWeight={800}>{t('mypets-kicker')}</Typography><Typography variant='h1' sx={{ fontSize: { xs: '3.2rem', md: '4.6rem' } }}>{t('mypets-welcome', { name: user.firstname ?? user.firstName })}</Typography><Typography color='text.secondary' sx={{ mt: 1 }}>{petsData.length ? t('mypets-has-pets') : t('mypets-no-pets')}</Typography></Container></Box>
			<Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}><Container maxWidth='lg'><Tabs value={tab} onChange={(_event, value: number) => setTab(value)}><Tab label={t('tab-my-pets')} /><Tab label={t('tab-all-pets')} /></Tabs></Container></Box>
			{tab === 0 ? <Container maxWidth='lg' sx={{ py: { xs: 6, md: 9 } }}><PetsList petsData={petsData} status user={user} /></Container> : <PetsPage user={user} />}
		</Box>
	);
}
