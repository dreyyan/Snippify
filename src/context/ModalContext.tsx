/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from "react";
import Modal from "../components/Modal";

interface ModalProps {
  type?: 'alert' | 'info' | 'confirm' | 'error' | 'prompt';
  title?: string;
  content?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextType {
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (props: ModalProps) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalProps && (
        <Modal
          {...modalProps}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};