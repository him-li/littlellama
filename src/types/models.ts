export interface User {
  id: string;
  firstname?: string;
  firstName?: string;
  lastname?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  admin?: boolean;
  role?: "user" | "support" | "admin";
  owned_pets?: Pet[];
  saved_pets?: Pet[];
}

export interface Notification {
  id: string;
  pet_id?: string;
  title: string;
  message: string;
  kind?: string;
  pet_name?: string;
  read: boolean;
  created_at: string;
}
export interface Activity {
  id: string;
  event_type: string;
  subject_type: string;
  subject_id: string;
  title: string;
  detail?: string;
  created_at: string;
}
export interface Inquiry {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "open" | "in_progress" | "resolved";
  created_at: string;
}
export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  created_at: string;
}
export interface Conversation {
  id: string;
  user_id: string;
  assigned_support_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
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

export interface PetForm extends Omit<Pet, "id" | "picture"> {
  picture: File | string | null;
  image?: File | string | null;
}

export interface ModalProps {
  open: boolean;
  handleClose?: () => void;
}
