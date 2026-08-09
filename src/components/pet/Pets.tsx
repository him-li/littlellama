import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Typography } from '@/src/ui/mui';
import { GET } from '../../utils/api';
import PetsList from './components/PetsList';
import walkingLlama from '../../assets/walkingllama.png';
import type { Pet, User } from '../../types/models';

export default function Pets({ user }: { user: User | null }) {
	const { t } = useTranslation();
	const [petsData, setPetsData] = useState<Pet[]>([]);
	useEffect(() => { void GET<Pet[]>('/pet').then(setPetsData).catch(console.error); }, []);
	return (
		<>
			<Box sx={{ bgcolor: 'primary.light', overflow: 'hidden', py: { xs: 5, md: 7 } }}>
				<Container maxWidth='lg'><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr .65fr' }, alignItems: 'center', gap: 4 }}>
					<Stack spacing={1.5}><Typography color='primary.main' fontWeight={800}>{t('pets-kicker')}</Typography><Typography variant='h1' sx={{ fontSize: { xs: '3.3rem', md: '4.6rem' } }}>{t('pets-title')}</Typography><Typography color='text.secondary' sx={{ maxWidth: 680, fontSize: '1.06rem' }}>{t('pets-description')}</Typography></Stack>
					<Box component='img' src={walkingLlama.src} alt='' sx={{ justifySelf: 'center', width: { xs: 210, md: 300 }, maxHeight: 250, objectFit: 'contain' }} />
				</Box></Container>
			</Box>
			<Container maxWidth='lg' sx={{ py: { xs: 6, md: 9 } }}><PetsList petsData={petsData} user={user} /></Container>
		</>
	);
}
