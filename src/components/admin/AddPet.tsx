import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import {
	Avatar,
	Box,
	Card,
	Typography,
	Button,
	Paper,
	Stepper,
	Step,
	StepLabel,
} from '@/src/ui/mui';
import { POST } from '../../utils/api';
import AddInfo from './components/AddInfo';
import AddImage from './components/AddImage';
import Review from './components/Review';
import littleLlama from '../../assets/littleLlama.png';

export default function AddPet({ user }: any) {
	const { t } = useTranslation();
	const steps = [t('step-add-info'), t('step-upload-picture'), t('step-review')];
	const router = useRouter();
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		type: '',
		name: '',
		adoption_status: '',
		height: '',
		weight: '',
		color: '',
		bio: '',
		hypoallergenic: true,
		dietary_restrictions: '',
		breed: '',
		picture: null,
	});

	useEffect(() => {
		if (user?.admin === false) {
			router.replace('/not-found');
		}
	}, [user, router]);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	const handleAddPet = async () => {
		const body = new FormData();
		body.append('type', formData.type);
		body.append('name', formData.name);
		body.append('adoption_status', formData.adoption_status);
		body.append('height', formData.height);
		body.append('weight', formData.weight);
		body.append('color', formData.color);
		body.append('bio', formData.bio);
		body.append('hypoallergenic', String(formData.hypoallergenic));
		body.append('dietary_restrictions', formData.dietary_restrictions);
		body.append('breed', formData.breed);
		if (formData.picture) body.append('picture', formData.picture);
		console.log('This is body', body);
		const data = await POST('/pet', body);
		if (!data) {
			return;
		}
		handleNext();
	};

	return (
		<Box height='100vh' bgcolor='teal'>
			<Card sx={style}>
				{formData.picture && (
					<img
						src={URL.createObjectURL(new Blob([formData.picture]))}
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
				)}
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main', zIndex: 1 }}>
					<img src={littleLlama.src} height={75} alt='' />
				</Avatar>
				<Typography
					variant='h2'
					fontFamily='Markazi Text'
					color='secondary'
					zIndex={1}
				>
					Add Pet
				</Typography>
				<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, zIndex: 1 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel fontFamily='Markazi Text' color='primary'>
								{label}
							</StepLabel>
						</Step>
					))}
				</Stepper>
				<Paper
					variant='outlined'
					sx={{
						my: { xs: 3, md: 6 },
						p: { xs: 2, md: 3 },
						color: 'black',
						zIndex: 1,
						backgroundColor: 'transparent',
						border: '0',
					}}
				>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Typography variant='h5'>
								{formData.name} has been added.
							</Typography>
							<Typography variant='subtitle1'>
								{formData.name + ' the ' + formData.breed + ' ' + formData.type}{' '}
								has been successfully added to the database.
							</Typography>
							<Button
								variant='contained'
								color='secondary'
								onClick={() => {
									setFormData({ ...formData, name: '', picture: null });
									setActiveStep(0);
								}}
								sx={{ mt: 3, ml: 1 }}
							>
								Add Another Pet
							</Button>
						</React.Fragment>
					) : (
						<React.Fragment>
							{activeStep === 0 && (
								<AddInfo formData={formData} setFormData={setFormData} />
							)}
							{activeStep === 1 && (
								<AddImage formData={formData} setFormData={setFormData} />
							)}
							{activeStep === 2 && <Review formData={formData} />}
							<Box
								sx={{ display: 'flex', justifyContent: 'space-evenly' }}
								bgcolor='transparent'
							>
								{activeStep !== 0 && (
									<Button
										onClick={handleBack}
										variant='contained'
										color='secondary'
										sx={{ mt: 3, ml: 1 }}
									>
										Back
									</Button>
								)}
								<Button
									variant='contained'
									color='secondary'
									onClick={
										activeStep === steps.length - 1 ? handleAddPet : handleNext
									}
									sx={{ mt: 3, ml: 1 }}
								>
									{activeStep === steps.length - 1 ? t('link-addpet') : t('action-next')}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Paper>
			</Card>
		</Box>
	);
}

const style = {
	marginTop: 8,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: '75%',
	width: 400,
	bgcolor: 'background.paper',
	color: 'black',
	borderRadius: '5px',
	boxShadow: 24,
	p: 4,
};
