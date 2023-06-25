import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean; // Flag indicating whether the upload modal is open or not
  onOpen: () => void; // Function to open the upload modal
  onClose: () => void; // Function to close the upload modal
}

const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }), // Set isOpen to true to open the upload modal
  onClose: () => set({ isOpen: false }), // Set isOpen to false to close the upload modal
}));

export default useUploadModal;
