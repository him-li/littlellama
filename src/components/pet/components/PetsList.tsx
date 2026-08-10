import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@/src/ui/mui';
import { AnimatePresence, motion } from 'motion/react';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import PetDetails from './PetDetails';
import type { Pet, User } from '../../../types/models';
import { cardVariants } from '../../../utils/animations';

interface PetsListProps { petsData: Pet[]; hide?: boolean; status?: boolean; display?: boolean; user: User | null; emptyTitle?: string; emptyBody?: string; }

export default function PetsList({ petsData, hide = false, status = false, user, emptyTitle, emptyBody }: PetsListProps) {
	const { t } = useTranslation();
	const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
	if (!petsData.length) return (
		<Stack spacing={1.5} sx={{ py: 8, px: 2, alignItems: 'center', border: '1px dashed', borderColor: 'divider', borderRadius: 4, bgcolor: 'background.paper' }}>
			<PetsRoundedIcon color='primary' sx={{ fontSize: 44 }} />
			<Typography variant='h4'>{emptyTitle ?? t('empty-pets-title')}</Typography>
			<Typography color='text.secondary'>{emptyBody ?? t('empty-pets-body')}</Typography>
		</Stack>
	);
	return (
		<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,minmax(0,1fr))', lg: 'repeat(3,minmax(0,1fr))' }, gap: { xs: 2, md: 3 } }}>
			<AnimatePresence initial={false} mode='popLayout'>
			{petsData.map((pet) => (
				<motion.div key={pet.id} layout variants={cardVariants} initial='initial' animate='enter' exit='exit' whileHover={{ y: -5 }} transition={{ layout: { duration: 0.3 } }} style={{ minWidth: 0 }}>
				<Card elevation={0} sx={{ height: '100%', overflow: 'hidden', borderRadius: 2, bgcolor: 'background.paper', transition: 'box-shadow .25s ease', '&:hover': { boxShadow: '0 18px 42px rgba(24,32,31,.12)' } }}>
					<PetDetails open={selectedPetId === pet.id} handleClose={() => setSelectedPetId(null)} petId={pet.id} user={user} />
					<Box sx={{ position: 'relative', aspectRatio: '4 / 3', bgcolor: 'primary.light', overflow: 'hidden' }}>
						<Box component='img' src={pet.picture || '/favicon.ico'} alt={pet.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .35s ease', '.MuiCard-root:hover &': { transform: 'scale(1.04)' } }} />
						{status && <Chip label={pet.adoption_status} size='small' color={pet.adoption_status === 'Available' ? 'primary' : 'default'} sx={{ position: 'absolute', top: 14, insetInlineStart: 14, fontWeight: 700 }} />}
					</Box>
					<CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
						<Stack direction='row' sx={{ gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
							<Box sx={{ minWidth: 0 }}><Typography variant='h4' noWrap>{pet.name}</Typography><Typography color='text.secondary' noWrap>{[pet.breed, pet.type].filter(Boolean).join(' · ')}</Typography></Box>
							{!hide && <Button aria-label={`View ${pet.name}`} onClick={() => setSelectedPetId(pet.id)} variant='outlined' sx={{ minWidth: 44, width: 44, px: 0 }}><ArrowOutwardRoundedIcon /></Button>}
						</Stack>
					</CardContent>
				</Card>
				</motion.div>
			))}
			</AnimatePresence>
		</Box>
	);
}
