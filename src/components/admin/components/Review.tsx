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
} from '@/src/ui/mui';
import StraightenIcon from '@mui/icons-material/Straighten';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import NoFoodIcon from '@mui/icons-material/NoFood';
import { useTranslation } from 'react-i18next';
export default function Review({ formData }: any) {
	const { t } = useTranslation();
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
					image={formData.picture instanceof File ? URL.createObjectURL(formData.picture) : formData.picture}
						alt={formData.name}
						style={{
							borderRadius: 2,
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
						<ListItemText primary={t('para-adoption-status')} />
						<ListItemText
							primary={formData.adoption_status}
							slotProps={{ primary: { sx: { textAlign: 'right' } } }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<StraightenIcon style={{ rotate: '90deg' }} />
						</ListItemIcon>
						<ListItemText primary={t('para-height')} />
						<ListItemText
							primary={formData.height + ' cm'}
							slotProps={{ primary: { sx: { textAlign: 'right' } } }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<FitnessCenterIcon />
						</ListItemIcon>
						<ListItemText primary={t('para-weight')} />
						<ListItemText
							primary={formData.weight + ' kg'}
							slotProps={{ primary: { sx: { textAlign: 'right' } } }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<ColorLensIcon />
						</ListItemIcon>
						<ListItemText primary={t('para-color')} />
						<ListItemText
							primary={formData.color}
							slotProps={{ primary: { sx: { textAlign: 'right' } } }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<PriorityHighIcon />
						</ListItemIcon>
						<ListItemText primary={t('para-hypoallergenic')} />
						<ListItemText
							primary={formData.hypoallergenic ? t('yes') : t('no')}
							slotProps={{ primary: { sx: { textAlign: 'right' } } }}
						/>
					</ListItem>
					<ListItem sx={{ justifyContent: 'space-between' }}>
						<ListItemIcon>
							<NoFoodIcon />
						</ListItemIcon>
						<ListItemText primary={t('para-dietary-restrictions')} />
						<ListItemText
							primary={formData.dietary_restrictions}
							slotProps={{ primary: { sx: { textAlign: 'right' } } }}
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
	borderRadius: 2,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	minWidth: '50%',
};
