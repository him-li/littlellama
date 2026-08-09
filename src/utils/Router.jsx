import PropTypes from 'prop-types';
import { usePathname } from 'next/navigation';
import Home from '../components/user/Home';
import MyPets from '../components/pet/MyPets';
import Pets from '../components/pet/Pets';
import Search from '../components/pet/Search';
import AddPet from '../components/admin/AddPet';
import Dashboard from '../components/admin/Dashboard';
import PetDetails from '../components/pet/components/PetDetails';
import EditPet from '../components/admin/EditPet';
import NotFound from '../components/components/NotFound';

export default function Router({ user }) {
	const pathname = usePathname();
	const petDetails = pathname.match(/^\/pets\/([^/]+)$/);
	const editPet = pathname.match(/^\/pet\/([^/]+)\/edit$/);
	if (pathname === '/' || pathname === '/home') return <Home user={user} />;
	if (pathname === '/mypets') return <MyPets user={user} />;
	if (pathname === '/pets') return <Pets user={user} />;
	if (petDetails) return <PetDetails open petId={petDetails[1]} user={user} />;
	if (pathname === '/search') return <Search user={user} />;
	if (pathname === '/addpet') return <AddPet user={user} />;
	if (editPet) return <EditPet petId={editPet[1]} user={user} />;
	if (pathname === '/dashboard') return <Dashboard user={user} />;
	return <NotFound />;
}

Router.propTypes = {
	user: PropTypes.object,
};
