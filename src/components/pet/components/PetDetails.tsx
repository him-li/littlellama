import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
	Backdrop,
	Modal,
	Typography,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	CardActionArea,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Stack,
		Button,
		ButtonGroup,
		Box,
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
import { useSpring, animated } from '@react-spring/web';
import { GET, POST, DELETE } from '../../../utils/api';
import type { ModalProps, Pet, User } from '../../../types/models';

interface PetDetailsProps extends ModalProps {
	petId: string;
	user: User | null;
}

const Fade = React.forwardRef(function Fade(props: any, ref: any) {
	const {
		children,
		in: open,
		onClick,
		onEnter,
		onExited,
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

export default function PetDetails({ open, handleClose, petId, user }: PetDetailsProps) {
	const router = useRouter();
	const { t } = useTranslation();
	const [pet, setPet] = useState<Partial<Pet>>({});
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (!open) return;
		const fetchPet = async () => {
			try {
				const res = await GET<Pet>(`/pet/${petId}`);
				setSaved(Boolean(res.saved));
				setPet(res);
			} catch (error) {
				console.error('Error fetching pet data:', error);
			}
		};
		void fetchPet();
	}, [petId, open, user?.id]);

	const updatePet = (updatedPet: Pet) => {
		setPet((current) => ({
			...updatedPet,
			saved: current.saved,
			relation_id: current.relation_id,
		}));
	};

	const handleReturn = async () => {
		try {
			await POST(`/pet/${pet.id}/return`);
			const updatedPet = await GET<Pet>(`/pet/${pet.id}`);
			updatePet(updatedPet);
		} catch (error) {
			console.error('Error returning pet:', error);
		}
	};

	const handleAdopt = async () => {
		try {
			const updatedPet = await POST<Pet>(`/pet/${pet.id}/adopt`, {});
			updatePet(updatedPet);
		} catch (error) {
			console.error('Error adopting pet:', error);
		}
	};

	const handleFoster = async () => {
		try {
			const updatedPet = await POST<Pet>(`/pet/${pet.id}/foster`, {});
			updatePet(updatedPet);
		} catch (error) {
			console.error('Error fostering pet:', error);
		}
	};

	const handleSave = async () => {
		if (saved) {
			try {
				await DELETE(`/pet/${pet.relation_id}/save`);
				setSaved(false);
				setPet((current) => ({ ...current, saved: false, relation_id: undefined }));
			} catch (error) {
				console.error('Error unsaving pet:', error);
			}
		} else {
			try {
				const res = await POST<{ id: string; saved: boolean }>(`/pet/${pet.id}/save`, {});
				setSaved(true);
				setPet((current) => ({ ...current, saved: true, relation_id: res.id }));
			} catch (error) {
				console.error('Error saving pet:', error);
			}
		}
	};

	const handleEdit = () => {
		router.push(`/pet/${pet.id}/edit`);
	};

	const closeDetails = () => {
		if (handleClose) handleClose();
		else router.push('/pets');
	};
	const isOwner = Boolean(user && pet.taken_by_user_id === user.id);
	const isAvailable = pet.adoption_status === 'Available' && !pet.taken_by_user_id;
	const canAdopt = isAvailable || (isOwner && pet.adoption_status === 'Fostered');
	const canFoster = isAvailable;

	return (
		<Modal
			aria-labelledby='pet-detail'
			aria-describedby='pet-detail'
			open={open}
			onClose={closeDetails}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
		>
			<Fade in={open}>
				<Card sx={style} onClick={(e) => e.stopPropagation()}>
					<Box component='img'
						src={pet.picture}
						alt=''
						aria-hidden='true'
						style={{
							opacity: 1,
							position: 'absolute',
							bottom: 0,
							width: '100%',
							height: '100%',
							zIndex: 0,
							filter: 'blur(50px)',
						}}
					/>
					<CardActionArea>
						<Stack direction='row' sx={{ justifyContent: 'space-between' }}>
							<Stack>
								<CardMedia
									component='img'
									image={pet.picture}
									alt={pet.name}
									style={{
										borderRadius: '5px',
										minWidth: '300px',
										boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
									}}
								/>
								<CardContent>
									<Typography variant='h4' component='div'>
										{pet.name}
									</Typography>
									<Typography variant='h5' color='text.secondary'>
										{pet.breed + ' ' + pet.type}
									</Typography>
									<Typography variant='body' color='text.secondary' mt={5}>
										{'Bio: ' + pet.bio}
									</Typography>
								</CardContent>
							</Stack>
							<List
								style={{
									margin: '1em',
									minWidth: '50%',
								}}
							>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary={t('para-adoption-status')} />
									<ListItemText
										primary={pet.adoption_status}
										slotProps={{ primary: { sx: { textAlign: 'right' } } }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<StraightenIcon style={{ rotate: '90deg' }} />
									</ListItemIcon>
									<ListItemText primary={t('para-height')} />
									<ListItemText
										primary={pet.height + ' cm'}
										slotProps={{ primary: { sx: { textAlign: 'right' } } }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<FitnessCenterIcon />
									</ListItemIcon>
									<ListItemText primary={t('para-weight')} />
									<ListItemText
										primary={pet.weight + ' kg'}
										slotProps={{ primary: { sx: { textAlign: 'right' } } }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<ColorLensIcon />
									</ListItemIcon>
									<ListItemText primary={t('para-color')} />
									<ListItemText
										primary={pet.color}
										slotProps={{ primary: { sx: { textAlign: 'right' } } }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<PriorityHighIcon />
									</ListItemIcon>
									<ListItemText primary={t('para-hypoallergenic')} />
									<ListItemText
										primary={pet.hypoallergenic ? t('yes') : t('no')}
										slotProps={{ primary: { sx: { textAlign: 'right' } } }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<NoFoodIcon />
									</ListItemIcon>
									<ListItemText primary={t('para-dietary-restrictions')} />
									<ListItemText
										primary={pet.dietary_restrictions}
										slotProps={{ primary: { sx: { textAlign: 'right' } } }}
									/>
								</ListItem>
							</List>
						</Stack>
					</CardActionArea>
					<CardActions
							style={{
								justifyContent: 'center',
								width: '100%',
								padding: '0',
							}}
						>
							<ButtonGroup fullWidth size='large'>
								{user && isOwner && pet.adoption_status !== 'Available' && (
									<Button variant='text' color='inherit' onClick={handleReturn}>
										<UndoIcon sx={{ mr: 1 }} />
										{t('action-return')}
									</Button>
								)}
								{user && canAdopt && (
									<Button variant='text' color='inherit' onClick={handleAdopt}>
										<AddHomeIcon sx={{ mr: 1 }} />
										{t('action-adopt')}
									</Button>
								)}
								{user && canFoster && (
									<Button variant='text' color='inherit' onClick={handleFoster}>
										<PetsIcon sx={{ mr: 1 }} />
										{t('action-foster')}
									</Button>
								)}
								{user && <Button variant='text' color='inherit' onClick={handleSave}>
									{saved ? (
										<StarIcon sx={{ mr: 1 }} />
									) : (
										<StarBorderIcon sx={{ mr: 1 }} />
									)}
									{t('action-save')}
								</Button>}
								{user?.admin && (
									<Button variant='text' color='inherit' onClick={handleEdit}>
										<EditIcon sx={{ mr: 1 }} />
										{t('action-edit')}
									</Button>
								)}
								<Button variant='text' color='inherit' onClick={closeDetails}>
									<CloseIcon sx={{ mr: 1 }} />
									{t('action-close')}
								</Button>
							</ButtonGroup>
					</CardActions>
				</Card>
			</Fade>
		</Modal>
	);
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	color: 'black',
	borderRadius: '5px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: '50%',
};
