import { useEffect, useState } from 'react';
import { Box, Container, Tab, Tabs, Typography } from '@/src/ui/mui';
import { GET } from '../../utils/api';
import PetsList from './components/PetsList';
import PetsPage from './Pets';
import type { Pet, User } from '../../types/models';

export default function MyPets({ user }: { user: User | null }) {
	const [petsData, setPetsData] = useState<Pet[]>([]);
	const [tab, setTab] = useState(0);
	useEffect(() => { if (user?.id) void GET<Pet[]>(`/pet/user/${user.id}`).then(setPetsData).catch(console.error); }, [user]);
	if (!user) return <Container maxWidth='md' sx={{ py: 12, textAlign: 'center' }}><Typography variant='h2'>Please log in to see your pets.</Typography></Container>;
	return (
		<Box>
			<Box sx={{ bgcolor: 'primary.light', py: { xs: 5, md: 7 } }}><Container maxWidth='lg'><Typography color='primary.main' fontWeight={800}>YOUR FAMILY</Typography><Typography variant='h1' sx={{ fontSize: { xs: '3.2rem', md: '4.6rem' } }}>Welcome home, {user.firstname ?? user.firstName}</Typography><Typography color='text.secondary' sx={{ mt: 1 }}>{petsData.length ? 'These are the pets you currently own or foster.' : 'You do not currently own or foster any pets.'}</Typography></Container></Box>
			<Box sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}><Container maxWidth='lg'><Tabs value={tab} onChange={(_event, value: number) => setTab(value)}><Tab label='My pets' /><Tab label='All pets' /></Tabs></Container></Box>
			{tab === 0 ? <Container maxWidth='lg' sx={{ py: { xs: 6, md: 9 } }}><PetsList petsData={petsData} status user={user} /></Container> : <PetsPage user={user} />}
		</Box>
	);
}
