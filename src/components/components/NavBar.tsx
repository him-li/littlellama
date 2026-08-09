import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	Tooltip,
	MenuItem,
	Link,
	Slide,
	useScrollTrigger,
} from '@/src/ui/mui';
import MenuIcon from '@mui/icons-material/Menu';
import littleLlama from '../../assets/littleLlama.png';

function HideOnScroll(props: any) {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction='down' in={!trigger}>
			{children}
		</Slide>
	);
}

export default function Navbar({ user, props }: any) {
	const { t } = useTranslation();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const pages = [
		{
			page: `${t('link-home')}`,
			route: '/',
		},
		{
			page: `${t('text-search')}`,
			route: '/search',
		},
		{
			page: `${t('link-pets')}`,
			route: '/pets',
		},
		{
			page: `${t('link-mypets')}`,
			route: '/mypets',
		},
	];

	const admin = [
		{
			page: `${t('link-addpet')}`,
			route: '/addpet',
		},
		{
			page: `${t('link-dashboard')}`,
			route: '/dashboard',
		},
	];

	return (
		<HideOnScroll {...props}>
			<AppBar
				position='sticky'
				style={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
			>
				<Container maxWidth='md'>
					<Toolbar disableGutters>
						<img src={littleLlama.src} height={75} alt='Little Llama' />
						<Typography
							variant='h5'
							noWrap
							href='/'
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'Markazi Text',
								fontWeight: 700,
								letterSpacing: '.1rem',
								color: 'teal',
								textDecoration: 'none',
							}}
						>
							{t('heading-little-llama')}
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleOpenNavMenu}
								color='success'
							>
								<MenuIcon />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page, index) => (
									<MenuItem key={index} onClick={handleCloseNavMenu}>
										<Typography textAlign='center'>{page.page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant='h5'
							noWrap
							href='/'
							sx={{
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'teal',
								textDecoration: 'none',
							}}
						>
							{t('heading-little-llama')}
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							<Button
								variant='text'
								color='success'
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: 'black',
								}}
							>
								<Link href='/' underline='none' color='black'>
									{t('link-home')}
								</Link>
							</Button>
							<Button
								variant='text'
								color='success'
								onClick={handleCloseNavMenu}
								sx={{
									my: 2,
									color: 'black',
								}}
							>
								<Link href='/search' underline='none' color='black'>
									{t('text-search')}
								</Link>
							</Button>
							{user ? (
								<Button
									variant='text'
									color='success'
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'black',
									}}
								>
									<Link href='/mypets' underline='none' color='black'>
										{t('link-mypets')}
									</Link>
								</Button>
							) : (
								<Button
									variant='text'
									color='success'
									onClick={handleCloseNavMenu}
									sx={{
										my: 2,
										color: 'black',
									}}
								>
									<Link href='/pets' underline='none' color='black'>
										{t('link-pets')}
									</Link>
								</Button>
							)}
						</Box>
						{user?.admin && (
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title='Admin pages'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										<Avatar src={littleLlama.src} />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id='menu-appbar'
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{admin.map((setting, index) => (
										<MenuItem key={index} onClick={handleCloseUserMenu}>
											<Link
												textAlign='center'
												href={setting.route}
												underline='none'
												color='black'
											>
												{setting.page}
											</Link>
										</MenuItem>
									))}
								</Menu>
							</Box>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</HideOnScroll>
	);
}


