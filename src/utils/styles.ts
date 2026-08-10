export const dottedHeroSx = {
	position: 'relative',
	overflow: 'hidden',
	bgcolor: 'primary.dark',
	color: 'common.white',
	'&::before': {
		content: '""',
		position: 'absolute',
		inset: 0,
		opacity: 0.16,
		backgroundImage: 'radial-gradient(circle at 15% 20%, #fff 0 2px, transparent 3px)',
		backgroundSize: '34px 34px',
		pointerEvents: 'none',
	},
} as const;

export const dottedHeroContentSx = { position: 'relative' } as const;

export const centeredModalRootSx = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	p: 2,
	'& > .MuiBackdrop-root': { zIndex: -1 },
} as const;

export const centeredModalSurfaceSx = {
	width: { xs: '100%', sm: 400 },
	maxHeight: 'calc(100dvh - 32px)',
	overflowY: 'auto',
	bgcolor: 'background.paper',
	color: 'text.primary',
	borderRadius: 2,
	boxShadow: 24,
	p: { xs: 2.5, sm: 4 },
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
} as const;
