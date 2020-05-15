import React, { useState, useCallback } from 'react';
import { Modal } from 'components';

const useModal = ({ onOpen, onClose } = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // modal can open with a custom message which will replace children content
  const handleOpenModal = (message = '') => {
    void onOpen?.();
    setMessage(message);
    setIsOpen(true);
  };

  const handleCloseModal = _ => {
    void onClose?.();
    setIsOpen(false);
  };

  const ModalComponent = useCallback(
    props => <Modal isOpen={isOpen} onClose={handleCloseModal} message={message} {...props} />,
    [isOpen]
  );

  return [ModalComponent, handleOpenModal, handleCloseModal];
};

export default useModal;
