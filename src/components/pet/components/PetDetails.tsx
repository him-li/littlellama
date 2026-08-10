import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
	Box, Button, Chip, CircularProgress, Divider, Drawer, IconButton,
	Stack, Typography,
} from '@/src/ui/mui';
import StraightenIcon from '@mui/icons-material/Straighten';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NoFoodIcon from '@mui/icons-material/NoFood';
import UndoIcon from '@mui/icons-material/Undo';
import PetsIcon from '@mui/icons-material/Pets';
import AddHomeIcon from '@mui/icons-material/AddHome';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { DELETE, GET, POST } from '../../../utils/api';
import type { ModalProps, Pet, User } from '../../../types/models';

interface PetDetailsProps extends ModalProps {
	petId: string;
	user: User | null;
}

interface DetailItemProps {
	icon: ReactNode;
	label: string;
	value: ReactNode;
}

function DetailItem({ icon, label, value }: DetailItemProps) {
	return (
		<Stack direction='row' spacing={1.5} sx={{ alignItems: 'center', minWidth: 0 }}>
			<Box sx={{ display: 'grid', placeItems: 'center', width: 38, height: 38, flexShrink: 0, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.main' }}>{icon}</Box>
			<Box sx={{ minWidth: 0 }}>
				<Typography variant='caption' color='text.secondary'>{label}</Typography>
				<Typography fontWeight={700} sx={{ overflowWrap: 'anywhere' }}>{value || '—'}</Typography>
			</Box>
		</Stack>
	);
}

export default function PetDetails({ open, handleClose, petId, user }: PetDetailsProps) {
	const router = useRouter();
	const { t } = useTranslation();
	const [pet, setPet] = useState<Pet | null>(null);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (!open) return;
		let active = true;
		void GET<Pet>(`/pet/${petId}`)
			.then((result) => {
				if (!active) return;
				setPet(result);
				setSaved(Boolean(result.saved));
			})
			.catch((error) => console.error('Error fetching pet data:', error));
		return () => { active = false; };
	}, [petId, open, user?.id]);

	const closeDetails = () => {
		if (handleClose) handleClose();
		else router.push('/pets');
	};
	const replacePet = (updatedPet: Pet) => setPet((current) => current ? ({ ...updatedPet, saved: current.saved, relation_id: current.relation_id }) : updatedPet);

	const handleReturn = async () => {
		if (!pet) return;
		await POST(`/pet/${pet.id}/return`);
		replacePet(await GET<Pet>(`/pet/${pet.id}`));
	};
	const handleAdopt = async () => { if (pet) replacePet(await POST<Pet>(`/pet/${pet.id}/adopt`, {})); };
	const handleFoster = async () => { if (pet) replacePet(await POST<Pet>(`/pet/${pet.id}/foster`, {})); };
	const handleSave = async () => {
		if (!pet) return;
		if (saved && pet.relation_id) {
			await DELETE(`/pet/${pet.relation_id}/save`);
			setSaved(false);
			setPet({ ...pet, saved: false, relation_id: undefined });
		} else {
			const result = await POST<{ id: string }>(`/pet/${pet.id}/save`, {});
			setSaved(true);
			setPet({ ...pet, saved: true, relation_id: result.id });
		}
	};

	const isOwner = Boolean(user && pet?.taken_by_user_id === user.id);
	const isAvailable = pet?.adoption_status === 'Available' && !pet.taken_by_user_id;
	const canAdopt = isAvailable || (isOwner && pet?.adoption_status === 'Fostered');
	const detailItems = pet ? [
		{ icon: <HomeIcon fontSize='small' />, label: t('para-adoption-status'), value: pet.adoption_status },
		{ icon: <StraightenIcon fontSize='small' sx={{ rotate: '90deg' }} />, label: t('para-height'), value: `${pet.height} cm` },
		{ icon: <FitnessCenterIcon fontSize='small' />, label: t('para-weight'), value: `${pet.weight} kg` },
		{ icon: <ColorLensIcon fontSize='small' />, label: t('para-color'), value: pet.color },
		{ icon: <PriorityHighIcon fontSize='small' />, label: t('para-hypoallergenic'), value: pet.hypoallergenic ? t('yes') : t('no') },
		{ icon: <NoFoodIcon fontSize='small' />, label: t('para-dietary-restrictions'), value: pet.dietary_restrictions },
	] : [];

	return (
		<Drawer
			anchor='bottom'
			open={open}
			onClose={closeDetails}
			slotProps={{
				paper: { sx: {
					maxHeight: '92dvh', borderRadius: '16px 16px 0 0', overflow: 'hidden',
					bgcolor: 'background.paper',
				} },
			}}
		>
			<Box sx={{ width: 52, height: 5, borderRadius: 99, bgcolor: 'divider', mx: 'auto', mt: 1.25, mb: .5 }} />
			{!pet ? (
				<Box sx={{ minHeight: 320, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>
			) : (
				<>
					<Box sx={{ overflowY: 'auto' }}>
						<Box sx={{ maxWidth: 1120, mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, pt: 1, pb: 3 }}>
							<Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
								<Box>
									<Stack direction='row' spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
										<Typography id='pet-detail-title' variant='h2' sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>{pet.name}</Typography>
										<Chip size='small' label={pet.adoption_status} color={pet.adoption_status === 'Available' ? 'primary' : 'default'} />
									</Stack>
									<Typography color='text.secondary'>{[pet.breed, pet.type].filter(Boolean).join(' · ')}</Typography>
								</Box>
								<IconButton aria-label={t('action-close')} onClick={closeDetails}><CloseIcon /></IconButton>
							</Stack>

							<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(320px, .9fr) minmax(0, 1.1fr)' }, gap: { xs: 2.5, md: 4 }, alignItems: 'start' }}>
								<Box component='img' src={pet.picture || '/favicon.ico'} alt={pet.name} sx={{ width: '100%', aspectRatio: { xs: '4 / 3', sm: '16 / 10' }, maxHeight: 470, objectFit: 'cover', borderRadius: 2, bgcolor: 'primary.light' }} />
								<Stack spacing={2.5}>
									<Box><Typography variant='overline' color='primary.main' fontWeight={800}>{t('para-bio')}</Typography><Typography sx={{ mt: .5, fontSize: '1.05rem', lineHeight: 1.7 }}>{pet.bio}</Typography></Box>
									<Divider />
									<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>{detailItems.map((item) => <DetailItem key={item.label} {...item} />)}</Box>
								</Stack>
							</Box>
						</Box>
					</Box>
					<Divider />
					<Stack direction='row' spacing={1} sx={{ maxWidth: 1120, width: '100%', mx: 'auto', p: { xs: 1.5, sm: 2 }, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
						{user && isOwner && pet.adoption_status !== 'Available' ? <Button startIcon={<UndoIcon />} onClick={() => void handleReturn()}>{t('action-return')}</Button> : null}
						{user && canAdopt ? <Button variant='contained' startIcon={<AddHomeIcon />} onClick={() => void handleAdopt()}>{t('action-adopt')}</Button> : null}
						{user && isAvailable ? <Button variant='outlined' startIcon={<PetsIcon />} onClick={() => void handleFoster()}>{t('action-foster')}</Button> : null}
						{user ? <Button variant='outlined' startIcon={saved ? <StarIcon /> : <StarBorderIcon />} onClick={() => void handleSave()}>{saved ? t('action-unsave') : t('action-save')}</Button> : null}
						{user?.admin ? <Button startIcon={<EditIcon />} onClick={() => router.push(`/pet/${pet.id}/edit`)}>{t('action-edit')}</Button> : null}
					</Stack>
				</>
			)}
		</Drawer>
	);
}
