import { useState } from 'react';
import {
	Box,
	Card,
	CardActions,
	Stack,
	Typography,
	IconButton,
} from '@/src/ui/mui';
import Masonry from '@mui/lab/Masonry';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PetDetails from './PetDetails';
import type { Pet, User } from '../../../types/models';

interface PetsListProps {
	petsData: Pet[];
	hide?: boolean;
	status?: boolean;
	display?: boolean;
	user: User | null;
}

export default function PetsList({ petsData, hide, status, user }: PetsListProps) {
	const [selectedPetId, setSelectedPetId] = useState(null);
	const [open, setOpen] = useState(false);

	const handleOpenDetails = (petId) => {
		setSelectedPetId(petId);
		setOpen(true);
	};
	return (
		<Box
			flex
			flexDirection='column'
			maxWidth='md'
			m={8}
			height='100%'
			justifyContent='center'
		>
			<Masonry columns={3} spacing={2}>
				{petsData.map((pet, index) => (
					<Card
						key={index}
						style={{
							borderRadius: '5px',
							boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
						}}
					>
						<PetDetails
							open={open && selectedPetId === pet.id}
							handleClose={() => setOpen(false)}
							petId={pet.id}
							user={user}
						/>
						<img
							srcSet={`${pet.picture}?w=162&auto=format&dpr=2 2x`}
							src={`${pet.picture}?w=162&auto=format`}
							alt={pet.name}
							width='100%'
							style={{
								display: 'block',
								borderRadius: '5px',
							}}
						/>
						<CardActions
							sx={{
								display: 'flex',
								p: 0,
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
							}}
						>
							<img
								src={pet.picture}
								width='100%'
								height='100%'
								style={{
									position: 'absolute',
									filter: 'blur(25px)',
								}}
							/>
							<Stack zIndex={1} p={2}>
								<Typography align='left' variant='h5'>
									{pet.name}
								</Typography>
								<Typography align='left'>
									{pet.breed + ' ' + pet.type}
								</Typography>
								{status && (
									<Typography align='left'>{pet.adoption_status}</Typography>
								)}
							</Stack>
							{!hide && (
								<IconButton
									onClick={() => handleOpenDetails(pet.id)}
									sx={{
										padding: '1rem',
									}}
								>
									<VisibilityIcon />
								</IconButton>
							)}
						</CardActions>
					</Card>
				))}
			</Masonry>
		</Box>
	);
}
