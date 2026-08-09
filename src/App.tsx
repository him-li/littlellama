'use client';

import { useState, useEffect } from 'react';
import { Stack } from '@/src/ui/mui';
import Router from './utils/Router';
import Navbar from './components/components/NavBar';
import Footer from './components/components/Footer';
import { GET } from './utils/api';
import type { User } from './types/models';

export default function App() {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	const fetchCurrentUser = async () => {
		try {
			const res = await GET<User | null>('/login');
			if (res !== null) {
				console.log(res);
				setUser(res);
			} else {
				console.log('No user found');
			}
		} catch (error) {
			console.log('Error fetching current user', error);
		}
	};

	return (
		<Stack minHeight='100vh'>
			<Navbar user={user} />
			<Router user={user} />
			<Footer />
		</Stack>
	);
}
