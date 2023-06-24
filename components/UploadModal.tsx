"use client";



import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from './Modal';
import Button from './Button';

const UploadModal = () => {



  return (
    <Modal
      title="Add a song"
      description="Upload an mp3 file"
      isOpen
      onChange={() => {}}
    >
     
    </Modal>
  );
}

export default UploadModal;