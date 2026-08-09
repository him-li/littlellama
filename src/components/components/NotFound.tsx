import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Avatar, Typography } from '@/src/ui/mui';
import walkingLlama from '../../assets/walkingllama.png';

export default function NotFound() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.replace('/');
		}, 5000);
	}, [router]);

	return (
		<Box height='100vh' bgcolor='teal'>
			<Box sx={style}>
				<Avatar
					src={walkingLlama.src}
					sx={{ width: 150, height: 150 }}
				/>
				<Typography variant='h4'>
					Oops... You&apos;ve landed somewhere without any llama!
				</Typography>
				<Typography variant='h4'>
					We&apos;ll redirect you back to the home page in 5 seconds.
				</Typography>
			</Box>
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
