/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { AppBar, Tabs, Tab, Typography, Box, Grid } from '@mui/material';
import { GET } from '../../utils/api';
import PetsList from './components/PetsList';
import PetsPage from './Pets';
import walkingLlama from '../../assets/walkingllama.png';

function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box component='center' sx={{ width: '100%', height: '100%' }}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}
export default function MyPets({ user }) {
	const theme = useTheme();
	const [petsData, setPetsData] = useState([]);
	const [value, setValue] = useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		const fetchPetsData = async () => {
			if (!user.id) {
				return;
			}
			try {
				const res = await GET(`/pet/user/${user.id}`);
				console.log(res);
				setPetsData(res);
			} catch (error) {
				console.error('Error fetching pets data:', error);
			}
		};
		fetchPetsData();
	}, [user]);

	return (
		<Box width='100%'>
			<AppBar position='static'>
				<Tabs
					value={value}
					onChange={handleChange}
					textColor='primary'
					indicatorColor='primary'
					variant='fullWidth'
					sx={{ backgroundColor: 'teal' }}
				>
					<Tab label='My Pets' {...a11yProps(0)} />
					<Tab label='All Pets' {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0} dir={theme.direction}>
				<Box component='center'>
					<Box bgcolor='teal' minHeight='25vh'>
						<Grid
							container
							maxWidth='md'
							height={100}
							gap={4}
							justifyContent='space-between'
						>
							<Grid item xs={6} md={6} gap={2} m={4}>
								<Typography
									variant='h3'
									fontFamily='Markazi Text'
									align='left'
									color='secondary'
								>
									Welcome back home {user.firstName}!
								</Typography>
								<Typography align='left'>
									{Object.keys(petsData).length !== 0
										? 'These are your owned or fostered pets.'
										: 'You currently do not own or foster any pets.'}
								</Typography>
							</Grid>
							<Grid item flexGrow={1} xs='auto' md={4} position='relative'>
								<img
									src={walkingLlama.src}
									width='100%'
									style={{
										borderRadius: 5,
										position: 'absolute',
										top: '0',
										left: '0',
									}}
								/>
							</Grid>
						</Grid>
					</Box>
					<PetsList petsData={petsData} status={true} user={user} />
				</Box>
			</TabPanel>
			<TabPanel value={value} index={1} dir={theme.direction}>
				<PetsPage user={user} />
			</TabPanel>
		</Box>
	);
}

MyPets.prototype = {
	user: PropTypes.array,
};

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};
