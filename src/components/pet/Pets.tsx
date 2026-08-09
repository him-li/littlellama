/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@/src/ui/mui';
import { GET } from '../../utils/api';
import PetsList from './components/PetsList';
import walkingLlama from '../../assets/walkingllama.png';
import type { Pet, User } from '../../types/models';

export default function Pets({ user }: { user: User | null }) {
	const [petsData, setPetsData] = useState<Pet[]>([]);
	const userData = user;
	console.log(userData);
	useEffect(() => {
		const fetchPetsData = async () => {
			try {
				console.log(user);
				if (user) {
					console.log(user.id);
					const pets = await GET<Pet[]>('/pet/', { id: user.id });
					console.log(pets);
					setPetsData(pets);
				} else {
					const pets = await GET<Pet[]>('/pet');
					console.log(pets);
					setPetsData(pets);
				}
			} catch (error) {
				console.error('Error fetching pets data:', error);
			}
		};
		fetchPetsData();
	}, [user]);

	return (
		<Box component='center'>
			<Box sx={{ backgroundColor: 'teal' }} minHeight='25vh'>
				<Grid container maxWidth='md' gap={4} justifyContent='space-between'>
					<Grid item xs={6} md={6} m={4} gap={2}>
						<Typography
							variant='h3'
							fontFamily='Markazi Text'
							align='left'
							color='secondary'
						>
							All Little Llamas for You!
						</Typography>
						<Typography align='left' paragraph>
							Welcome to Little Llama, your hub for adorable pets! Explore cats
							and dogs, click to view details, and choose <b>Adopt</b> or
							<b>Foster</b> Owners can <b>return</b> pets; others, adopt or
							foster. Save favorites with a click. Start your journey with us!
							🐾
						</Typography>
					</Grid>
					<Grid item flexGrow={1} xs='auto' md={4} position='relative'>
						<img
							src={walkingLlama.src}
							width='100%'
							style={{
								borderRadius: 5,
								boxShadow: 'revert',
								position: 'absolute',
								top: '0',
								left: '0',
							}}
						/>
					</Grid>
				</Grid>
			</Box>
			<PetsList petsData={petsData} user={user} />
		</Box>
	);
}
