export interface User {
	id: string;
	firstname?: string;
	firstName?: string;
	lastname?: string;
	email?: string;
	phone?: string;
	bio?: string;
	admin?: boolean;
	owned_pets?: Pet[];
	saved_pets?: Pet[];
}

export interface Pet {
	id: string;
	relation_id?: string;
	taken_by_user_id?: string | null;
	type: string;
	name: string;
	adoption_status: string;
	height: string | number;
	weight: string | number;
	color: string;
	bio: string;
	hypoallergenic: boolean;
	dietary_restrictions?: string;
	breed: string;
	picture?: string;
	saved?: boolean;
}

export interface PetForm extends Omit<Pet, 'id' | 'picture'> {
	picture: File | string | null;
	image?: File | string | null;
}

export interface ModalProps {
	open: boolean;
	handleClose?: () => void;
}
