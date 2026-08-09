/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import {
	Typography,
	List,
	ListItem,
	ListItemText,
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Stack,
	ListItemIcon,
} from '@mui/material';
import StraightenIcon from '@mui/icons-material/Straighten';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NoFoodIcon from '@mui/icons-material/NoFood';
export default function Review({ formData }) {
	return (
		<Card sx={style} onClick={(e) => e.stopPropagation()}>
			<CardActionArea
				style={{
					display: 'flex',
					flexDirection: 'row',
					backgroundColor: 'none',
				}}
			>
				<Stack>
					<CardMedia
						component='img'
						image={URL.createObjectURL(new Blob([formData.picture]))}
						alt={formData.name}
						style={{
							borderRadius: '5px',
							minWidth: '300px',
							boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
						}}
					/>
					<CardContent>
						<Typography variant='h4' component='div'>
							{formData.name}
						</Typography>
						<Typography variant='h5' color='text.secondary'>
							{formData.breed + ' ' + formData.type}
						</Typography>
						<Typography variant='body' color='text.secondary' mt={5}>
							{'Bio: ' + formData.bio}
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
							primary={formData.adoption_status}
							primaryTypographyProps={{ textAlign: 'right' }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<StraightenIcon style={{ rotate: '90deg' }} />
						</ListItemIcon>
						<ListItemText primary='Height' />
						<ListItemText
							primary={formData.height + ' cm'}
							primaryTypographyProps={{ textAlign: 'right' }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<FitnessCenterIcon />
						</ListItemIcon>
						<ListItemText primary='Weight' />
						<ListItemText
							primary={formData.weight + ' kg'}
							primaryTypographyProps={{ textAlign: 'right' }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<ColorLensIcon />
						</ListItemIcon>
						<ListItemText primary='Color' />
						<ListItemText
							primary={formData.color}
							primaryTypographyProps={{ textAlign: 'right' }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<PriorityHighIcon />
						</ListItemIcon>
						<ListItemText primary='Hypoallergenic' />
						<ListItemText
							primary={formData.hypoallergenic ? 'Yes' : 'No'}
							primaryTypographyProps={{ textAlign: 'right' }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<NoFoodIcon />
						</ListItemIcon>
						<ListItemText primary='Dietary Restrictions' />
						<ListItemText
							primary={formData.dietary_restrictions}
							primaryTypographyProps={{ textAlign: 'right' }}
						/>
					</ListItem>
				</List>
			</CardActionArea>
		</Card>
	);
}

const style = {
	bgcolor: 'transparent',
	color: 'black',
	borderRadius: '5px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: '50%',
};

Review.propType = {
	formData: PropTypes.object,
};
