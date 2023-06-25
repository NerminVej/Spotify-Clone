import { create } from "zustand";

// Define the interface for the AuthModalStore
interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

// Create the useAuthModal custom hook using Zustand
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }), // Set isOpen to true when opening the modal
  onClose: () => set({ isOpen: false }), // Set isOpen to false when closing the modal
}));

export default useAuthModal;
