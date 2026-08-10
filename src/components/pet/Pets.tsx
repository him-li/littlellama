import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Typography } from '@/src/ui/mui';
import { GET } from '../../utils/api';
import PetsList from './components/PetsList';
import walkingLlama from '../../assets/walkingllama.png';
import type { Pet, User } from '../../types/models';
import { dottedHeroContentSx, dottedHeroSx } from '../../utils/styles';

export default function Pets({ user }: { user: User | null }) {
	const { t } = useTranslation();
	const [petsData, setPetsData] = useState<Pet[]>([]);
	useEffect(() => { void GET<Pet[]>('/pet').then(setPetsData).catch(console.error); }, []);
	return (
		<>
			<Box sx={{ ...dottedHeroSx, py: { xs: 5, md: 7 } }}>
				<Container maxWidth='lg' sx={dottedHeroContentSx}><Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr .65fr' }, alignItems: 'center', gap: 4 }}>
					<Stack spacing={1.5}><Typography color='secondary.light' fontWeight={800}>{t('pets-kicker')}</Typography><Typography variant='h1'>{t('pets-title')}</Typography><Typography sx={{ maxWidth: 680, color: 'rgba(255,255,255,.75)' }}>{t('pets-description')}</Typography></Stack>
					<Box component='img' src={walkingLlama.src} alt='' sx={{ justifySelf: 'center', width: { xs: 210, md: 300 }, maxHeight: 250, objectFit: 'contain' }} />
				</Box></Container>
			</Box>
			<Container maxWidth='lg' sx={{ py: { xs: 6, md: 9 } }}><PetsList petsData={petsData} user={user} /></Container>
		</>
	);
}
