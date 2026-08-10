import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import Home from '../components/user/Home';
import MyPets from '../components/pet/MyPets';
import Pets from '../components/pet/Pets';
import Search from '../components/pet/Search';
import AddPet from '../components/admin/AddPet';
import Dashboard from '../components/admin/Dashboard';
import PetDetails from '../components/pet/components/PetDetails';
import EditPet from '../components/admin/EditPet';
import NotFound from '../components/components/NotFound';
import type { User } from '../types/models';
import { pageVariants } from './animations';

export default function Router({ user, authResolved }: { user: User | null; authResolved: boolean }) {
	const pathname = usePathname();
	const petDetails = pathname.match(/^\/pets\/([^/]+)$/);
	const editPet = pathname.match(/^\/pet\/([^/]+)\/edit$/);
	let page = <NotFound />;
	if (pathname === '/' || pathname === '/home') page = <Home user={user} />;
	else if (pathname === '/mypets') page = <MyPets user={user} />;
	else if (pathname === '/pets') page = <Pets user={user} />;
	else if (petDetails) page = <PetDetails open petId={petDetails[1]} user={user} />;
	else if (pathname === '/search') page = <Search user={user} />;
	const adminRoute = pathname === '/addpet' || pathname === '/dashboard' || Boolean(editPet);
	if (adminRoute && !authResolved) return null;
	if (adminRoute && !user?.admin) page = <NotFound />;
	else if (pathname === '/addpet') page = <AddPet user={user} />;
	else if (editPet) page = <EditPet petId={editPet[1]} user={user} />;
	else if (pathname === '/dashboard') page = <Dashboard user={user} />;

	return (
		<AnimatePresence initial={false} mode='wait'>
			<motion.main key={pathname} variants={pageVariants} initial='initial' animate='enter' exit='exit' style={{ flexGrow: 1 }}>
				{page}
			</motion.main>
		</AnimatePresence>
	);
}
