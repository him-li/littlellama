import { useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, MenuItem, Paper, Stack, TextField, Typography } from '@/src/ui/mui';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import PetsList from './components/PetsList';
import { GET } from '../../utils/api';
import type { Pet, User } from '../../types/models';

type SearchParams = { type: string; adoption_status: string; height: string; weight: string; name: string };
const initialParams: SearchParams = { type: '', adoption_status: '', height: '', weight: '', name: '' };

export default function Search({ user }: { user: User | null }) {
	const { t } = useTranslation();
	const [advanced, setAdvanced] = useState(false);
	const [petsData, setPetsData] = useState<Pet[]>([]);
	const [params, setParams] = useState(initialParams);
	const [searched, setSearched] = useState(false);
	const [loading, setLoading] = useState(false);
	const change = (event: ChangeEvent<HTMLInputElement>) => setParams((current) => ({ ...current, [event.target.name]: event.target.value }));
	const search = async () => {
		setLoading(true); setSearched(true);
		const query = new URLSearchParams();
		const activeParams = advanced ? params : { type: params.type };
		Object.entries(activeParams).forEach(([key, value]) => { if (value !== '') query.set(key, value); });
		try { setPetsData(await GET<Pet[]>(`/pet${query.size ? `?${query}` : ''}`)); } catch (error) { console.error(error); setPetsData([]); } finally { setLoading(false); }
	};
	return (
		<>
			<Box sx={{ bgcolor: 'primary.dark', color: 'white', py: { xs: 6, md: 9 } }}><Container maxWidth='md'><Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center' }}><Typography color='secondary.light' fontWeight={800}>{t('heading-search-kicker')}</Typography><Typography variant='h1' sx={{ fontSize: { xs: '3.4rem', md: '5rem' } }}>{t('heading-find-pet')}</Typography><Typography sx={{ color: 'rgba(255,255,255,.75)', maxWidth: 590 }}>{t('para-search')}</Typography></Stack></Container></Box>
		<Container maxWidth='md' sx={{ mt: { xs: -3, md: -4 }, position: 'relative', pb: 8 }}>
			<Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, border: '1px solid', borderColor: 'divider', boxShadow: '0 20px 50px rgba(24,32,31,.1)' }}>
				<Stack spacing={2}>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ '& .MuiInputBase-root': { height: 56 } }}><TextField select fullWidth name='type' value={params.type} onChange={change} label={t('para-type')}><MenuItem value=''>{t('text-any')}</MenuItem><MenuItem value='Cat'>{t('para-cat')}</MenuItem><MenuItem value='Dog'>{t('para-dog')}</MenuItem></TextField><Button variant='contained' onClick={() => void search()} startIcon={<SearchRoundedIcon />} disabled={loading} sx={{ minHeight: 56, px: 3.5, whiteSpace: 'nowrap' }}>{loading ? t('text-searching') : t('text-search')}</Button></Stack>
					<Button onClick={() => setAdvanced((value) => !value)} startIcon={<TuneRoundedIcon />} sx={{ alignSelf: 'flex-start' }}>{advanced ? t('text-hide-filters') : t('text-advanced-search')}</Button>
					{advanced && <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}><TextField name='name' value={params.name} onChange={change} label={t('para-name')} placeholder={t('text-pet-name')} /><TextField select name='adoption_status' value={params.adoption_status} onChange={change} label={t('para-adoption-status')}><MenuItem value=''>{t('text-any-status')}</MenuItem><MenuItem value='Adopted'>{t('para-adopted')}</MenuItem><MenuItem value='Fostered'>{t('para-fostered')}</MenuItem><MenuItem value='Available'>{t('para-available')}</MenuItem></TextField><TextField type='number' name='height' value={params.height} onChange={change} label={`${t('para-height')} (cm)`} slotProps={{ htmlInput: { min: 0, step: 'any' } }} /><TextField type='number' name='weight' value={params.weight} onChange={change} label={`${t('para-weight')} (kg)`} slotProps={{ htmlInput: { min: 0, step: 'any' } }} /></Box>}
				</Stack>
			</Paper>
			{searched && <Box sx={{ mt: 6 }}><Typography variant='h2' sx={{ fontSize: { xs: '2.6rem', md: '3.5rem' }, mb: 3 }}>{t('text-search-results')}</Typography><PetsList petsData={petsData} user={user} /></Box>}
		</Container>
		</>
	);
}
