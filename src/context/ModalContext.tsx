/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from "react";
import DialogBox from "../components/DialogBox";

interface DialogBoxProps {
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
  openModal: (props: DialogBoxProps) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within a ModalProvider");
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalProps, setModalProps] = useState<DialogBoxProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (props: DialogBoxProps) => {
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
        <DialogBox
          {...modalProps}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};