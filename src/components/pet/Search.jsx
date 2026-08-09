import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
	Box,
	Stack,
	Typography,
	Button,
	InputBase,
	FormControlLabel,
	Checkbox,
	NativeSelect,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import PetsList from './components/PetsList';
import { GET } from '../../utils/api';

export default function Search({ user }) {
	const { t } = useTranslation();
	const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
	const [petsData, setPetsData] = useState([]);
	const [searchParams, setSearchParams] = useState({
		type: '',
		adoption_status: '',
		height: false,
		weight: false,
		name: '',
	});
	const [searchButtonClicked, setSearchButtonClicked] = useState(false);

	const fetchPetsData = async () => {
		try {
			const queryParams = buildQueryParams(searchParams);
			const res = await GET(`/pet${queryParams}`);
			console.log(res);
			setPetsData(res);
		} catch (error) {
			console.error('Error fetching pets data:', error);
		}
	};

	const buildQueryParams = (params) => {
		const queryParams = [];
		for (const key in params) {
			if (params[key] !== '') {
				if (typeof params[key] === 'boolean') {
					queryParams.push(`${key}=${params[key]}`);
				} else {
					queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
				}
			}
		}
		console.log(queryParams);
		return queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setSearchParams((prevParams) => ({
			...prevParams,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSearch = async () => {
		setSearchButtonClicked(true);
		await fetchPetsData();
	};

	return (
		<Box component='center' height='100%'>
			<Box sx={{ backgroundColor: 'teal' }}>
				<Stack maxWidth='md' padding={10} gap={5} justifyContent='center'>
					<Typography variant='h2' color='secondary' fontFamily='Markazi Text'>
						Find Your Little Llama
					</Typography>
					<SearchBar>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder={
								isAdvancedSearch
									? `${t('text-advanced-search')}`
									: `${t('text-search')}…`
							}
							inputProps={{ 'aria-label': 'search' }}
							name='name'
							value={searchParams.name}
							onChange={handleInputChange}
						/>
						<Button
							variant='contained'
							color='secondary'
							style={{
								right: 0,
								position: 'absolute',
								top: 0,
								bottom: 0,
								margin: '0',
							}}
							onClick={handleSearch}
						>
							{t('text-search')}
						</Button>
					</SearchBar>
					<Stack direction='row' spacing={1} justifyContent='center'>
						<FormControlLabel
							control={
								<Checkbox
									color='secondary'
									name='advancedSearch'
									checked={isAdvancedSearch}
									onChange={() => setIsAdvancedSearch(!isAdvancedSearch)}
								/>
							}
							label={
								isAdvancedSearch
									? `${t('text-advanced-search')}`
									: 'Enable Advanced Search'
							}
						/>
						<NativeSelect
							defaultValue='Type'
							inputProps={{
								name: 'type',
								id: 'type',
							}}
							onChange={handleInputChange}
						>
							<option disabled>{t('para-type')}</option>
							<option value={'Cat'}>{t('para-cat')}</option>
							<option value={'Dog'}>{t('para-dog')}</option>
						</NativeSelect>
						{isAdvancedSearch && (
							<Stack direction='row' spacing={2}>
								{' '}
								<NativeSelect
									defaultValue='Adoption Status'
									inputProps={{
										name: 'adoption_status',
										id: 'adoption_status',
									}}
									onChange={handleInputChange}
								>
									<option disabled>{t('para-adoption-status')}</option>
									<option value={'Adopted'}>{t('para-adopted')}</option>
									<option value={'Fostered'}>{t('para-fostered')}</option>
									<option value={'Available'}>{t('para-available')}</option>
								</NativeSelect>
								<FormControlLabel
									control={
										<Checkbox
											color='secondary'
											name='height'
											value={searchParams.height}
											onChange={handleInputChange}
										/>
									}
									label={t('para-height')}
								/>
								<FormControlLabel
									control={
										<Checkbox
											color='secondary'
											name='weight'
											value={searchParams.weight}
											onChange={handleInputChange}
										/>
									}
									label={t('para-weight')}
								/>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Box>
			{searchButtonClicked && (
				<PetsList petsData={petsData} user={user} display={true} />
			)}
		</Box>
	);
}

const SearchBar = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

Search.propTypes = {
	user: PropTypes.object,
};
