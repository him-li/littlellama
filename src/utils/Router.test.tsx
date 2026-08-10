import { render, screen } from '@testing-library/react';
import Router from './Router';

let mockPathname = '/';

jest.mock('next/navigation', () => ({
	usePathname: () => mockPathname,
}));

jest.mock('../components/user/Home', () => function MockHome() { return <div>home</div>; });
jest.mock('../components/pet/MyPets', () => function MockMyPets() { return <div>my-pets</div>; });
jest.mock('../components/pet/Pets', () => function MockPets() { return <div>pets</div>; });
jest.mock('../components/pet/Search', () => function MockSearch() { return <div>search</div>; });
jest.mock('../components/admin/AddPet', () => function MockAddPet() { return <div>add-pet</div>; });
jest.mock('../components/admin/Dashboard', () => function MockDashboard() { return <div>dashboard</div>; });
jest.mock('../components/admin/EditPet', () => function MockEditPet() { return <div>edit-pet</div>; });
jest.mock('../components/pet/components/PetDetails', () => function MockPetDetails({ petId }: { petId: string }) { return <div>pet-{petId}</div>; });
jest.mock('../components/components/NotFound', () => function MockNotFound() { return <div>not-found</div>; });

describe('Router access control', () => {
	beforeEach(() => {
		mockPathname = '/';
	});

	it('waits for authentication before rendering an admin route', () => {
		mockPathname = '/dashboard';
		const { container } = render(<Router user={null} authResolved={false} />);

		expect(container).toBeEmptyDOMElement();
	});

	it('blocks signed-out and non-admin users from admin routes', () => {
		mockPathname = '/addpet';
		const { rerender } = render(<Router user={null} authResolved />);
		expect(screen.getByText('not-found')).toBeInTheDocument();

		rerender(<Router user={{ id: 'user-1', admin: false }} authResolved />);
		expect(screen.getByText('not-found')).toBeInTheDocument();
	});

	it('renders admin pages for administrators', () => {
		mockPathname = '/dashboard';
		render(<Router user={{ id: 'admin-1', admin: true }} authResolved />);

		expect(screen.getByText('dashboard')).toBeInTheDocument();
	});

	it('keeps public pet details available without a user', () => {
		mockPathname = '/pets/pet-123';
		render(<Router user={null} authResolved />);

		expect(screen.getByText('pet-pet-123')).toBeInTheDocument();
	});
});
