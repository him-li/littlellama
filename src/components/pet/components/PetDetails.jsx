import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
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
} from '@mui/material';
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

const Fade = React.forwardRef(function Fade(props, ref) {
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

export default function PetDetails({ open, handleClose, petId, user }) {
	const router = useRouter();
	const [pet, setPet] = useState([]);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		if (open) {
			const fetchPet = async () => {
				try {
					const userId = user.id;
					const res = await GET(`/pet/${petId}`, { userId });
					console.log('This is the user id', userId, 'Pet fetched', res);
					setSaved(res.saved);
					setPet(res);
				} catch (error) {
					console.error('Error fetching pets data:', error);
				}
			};
			fetchPet();
		}
	}, [petId, open, saved, user]);

	const handleReturn = async () => {
		try {
			await POST(`/pet/${pet.id}/return`);
			const updatedPet = await GET(`/pet/${pet.id}`, { user_id: user.id });
			console.log('Returned? Should be available', updatedPet.adoption_status);
			setPet(updatedPet);
		} catch (error) {
			console.error('Error returning pet:', error);
		}
	};

	const handleAdopt = async () => {
		try {
			await POST(`/pet/${pet.id}/adopt`, { user_id: user.id });
			const updatedPet = await GET(`/pet/${pet.id}`);
			setPet(updatedPet);
		} catch (error) {
			console.error('Error returning pet:', error);
		}
	};

	const handleFoster = async () => {
		try {
			await POST(`/pet/${pet.id}/foster`, { user_id: user.id });
			const updatedPet = await GET(`/pet/${pet.id}`);
			setPet(updatedPet);
		} catch (error) {
			console.error('Error returning pet:', error);
		}
	};

	const handleSave = async () => {
		if (saved) {
			try {
				await DELETE(`/pet/${pet.relation_id}/save`);
				setSaved(false);
			} catch (error) {
				console.error('Error unsaving pet:', error);
			}
		} else {
			try {
				const res = await POST(`/pet/${pet.id}/save`, { user_id: user.id });
				console.log(res.saved);
				setSaved(true);
			} catch (error) {
				console.error('Error saving pet:', error);
			}
		}
	};

	const handleEdit = async () => {
		router.push(`/pet/${pet.id}/edit`);
	};

	return (
		<Modal
			aria-labelledby='pet-detail'
			aria-describedby='pet-detail'
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
				<Card sx={style} onClick={(e) => e.stopPropagation()}>
					<img
						src={pet.picture}
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
						<Stack direction='row' justifyContent='space-between'>
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
									<ListItemText primary='Adoption Status' />
									<ListItemText
										primary={pet.adoption_status}
										primaryTypographyProps={{ textAlign: 'right' }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<StraightenIcon style={{ rotate: '90deg' }} />
									</ListItemIcon>
									<ListItemText primary='Height' />
									<ListItemText
										primary={pet.height + ' cm'}
										primaryTypographyProps={{ textAlign: 'right' }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<FitnessCenterIcon />
									</ListItemIcon>
									<ListItemText primary='Weight' />
									<ListItemText
										primary={pet.weight + ' kg'}
										primaryTypographyProps={{ textAlign: 'right' }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<ColorLensIcon />
									</ListItemIcon>
									<ListItemText primary='Color' />
									<ListItemText
										primary={pet.color}
										primaryTypographyProps={{ textAlign: 'right' }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<PriorityHighIcon />
									</ListItemIcon>
									<ListItemText primary='Hypoallergenic' />
									<ListItemText
										primary={pet.hypoallergenic ? 'Yes' : 'No'}
										primaryTypographyProps={{ textAlign: 'right' }}
									/>
								</ListItem>
								<ListItem sx={{ justifyContent: 'space-between' }}>
									<ListItemIcon>
										<NoFoodIcon />
									</ListItemIcon>
									<ListItemText primary='Dietary Restrictions' />
									<ListItemText
										primary={pet.dietary_restrictions}
										primaryTypographyProps={{ textAlign: 'right' }}
									/>
								</ListItem>
							</List>
						</Stack>
					</CardActionArea>
					{user && (
						<CardActions
							style={{
								justifyContent: 'center',
								width: '100%',
								padding: '0',
							}}
						>
							<ButtonGroup fullWidth size='large'>
								{pet.adoption_status !== 'Available' && (
									<Button variant='text' color='inherit' onClick={handleReturn}>
										<UndoIcon sx={{ mr: 1 }} />
										Return
									</Button>
								)}
								{pet.adoption_status !== 'Adopted' && (
									<Button variant='text' color='inherit' onClick={handleAdopt}>
										<AddHomeIcon sx={{ mr: 1 }} />
										Adopt
									</Button>
								)}
								{pet.adoption_status !== 'Fostered' && (
									<Button variant='text' color='inherit' onClick={handleFoster}>
										<PetsIcon sx={{ mr: 1 }} />
										Foster
									</Button>
								)}
								<Button variant='text' color='inherit' onClick={handleSave}>
									{saved ? (
										<StarIcon sx={{ mr: 1 }} />
									) : (
										<StarBorderIcon sx={{ mr: 1 }} />
									)}
									Save
								</Button>
								{user?.admin && (
									<Button variant='text' color='inherit' onClick={handleEdit}>
										<EditIcon sx={{ mr: 1 }} />
										Edit
									</Button>
								)}
								<Button variant='text' color='inherit' onClick={handleClose}>
									<CloseIcon sx={{ mr: 1 }} />
									Close
								</Button>
							</ButtonGroup>
						</CardActions>
					)}
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

Fade.propTypes = {
	children: PropTypes.element.isRequired,
	in: PropTypes.bool,
	onClick: PropTypes.any,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
	ownerState: PropTypes.any,
};
PetDetails.propTypes = {
	user: PropTypes.object,
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	petId: PropTypes.string,
	relationId: PropTypes.string,
	isSaved: PropTypes.bool,
	handleSave: PropTypes.func,
	handleAdopt: PropTypes.func,
	handleFoster: PropTypes.func,
	handleReturn: PropTypes.func,
};
