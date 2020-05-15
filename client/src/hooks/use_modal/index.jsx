import React, { useState, useCallback } from 'react';
import { Modal } from 'components';

const useModal = ({ onOpen, onClose } = {}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = _ => {
    void onOpen?.();
    setIsOpen(true);
  };

  const handleCloseModal = _ => {
    void onClose?.();
    setIsOpen(false);
  };

  const ModalComponent = useCallback(props => <Modal isOpen={isOpen} onClose={handleCloseModal} {...props} />, [
    isOpen,
  ]);

  return [ModalComponent, handleOpenModal, handleCloseModal];
};

export default useModal;
