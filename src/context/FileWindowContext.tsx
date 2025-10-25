/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, type ReactNode } from "react";
import FileWindow from "../components/FileWindow";

interface FileWindowProps {
    title: string;
    language: string;
    content: string;
    updatedAt: Date;
    className?: string;
}

interface FileWindowContextType {
    openFileWindow: (props: FileWindowProps) => void;
    closeFileWindow: () => void;
}

const FileWindowContext = createContext<FileWindowContextType | undefined>(undefined);

export const useFileWindow = () => {
    const context = useContext(FileWindowContext);
    if (!context) throw new Error("useModal must be used within a ModalProvider");
    return context;
};

export const FileWindowProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fileWindowProps, setfileWindowProps] = useState<FileWindowProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openFileWindow = (props: FileWindowProps) => {
    setfileWindowProps(props);
    setIsOpen(true);
  };

  const closeFileWindow = () => {
    setIsOpen(false);
    setfileWindowProps(null);
  };

  return (
    <FileWindowContext.Provider value={{ openFileWindow, closeFileWindow }}>
      {children}
      {fileWindowProps && (
        <FileWindow
          {...fileWindowProps}
          isOpen={isOpen}
          onClose={closeFileWindow}
        />
      )}
    </FileWindowContext.Provider>
  );
};