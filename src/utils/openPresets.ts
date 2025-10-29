import type { ModalProps } from "../components/Modal";

// * Confirm Modals
export const confirmSnippetDeletionModal: ModalProps = {
  type: "warning",
  title: "Delete Snippet",
  size: "sm",
  content: "Are you sure you want to delete this snippet? This action cannot be undone.",
};

// ? Info Modals
export const snippetCreatedModal: ModalProps = {
  type: "info",
  title: "Snippet Created",
  size: "sm",
  content: "Your new snippet has been successfully added.",
};

export const snippetDeletedModal: ModalProps = {
  type: "info",
  title: "Snippet Deleted",
  size: "sm",
  content: "Your snippet has been succesfully deleted.",
};

export const folderCreatedModal: ModalProps = {
  type: "info",
  title: "Folder Created",
  size: "sm",
  content: "Your new folder has been successfully created.",
};

export const folderDeletedModal: ModalProps = {
  type: "info",
  title: "Folder Deleted",
  size: "sm",
  content: "Your folder has been succesfully deleted.",
};

export const folderRenamedModal: ModalProps = {
  type: "info",
  title: "Folder Renamed",
  size: "sm",
  content: "Your folder has been succesfully renamed.",
};

// ! Error Modals
// General Error
export const generalErrorModal = (message = "an unknown error occured."): ModalProps => ({
  type: "error",
  title: "Error",
  size: "sm",
  content: message,
});

export const failedSnippetCreationModal: ModalProps = {
  type: "error",
  title: "Failed to Create Snippet",
  size: "sm",
  content: "Failed to create snippet, please try again.",
};

export const failedFolderCreationModal: ModalProps = {
  type: "error",
  title: "Failed to Create Folder",
  size: "sm",
  content: "Failed to create folder, please try again.",
};

export const failedFolderDeletionModal: ModalProps = {
  type: "error",
  title: "Failed to Delete Folder",
  size: "sm",
  content: "Failed to delete folder, please try again.",
};

export const failedSnippetDeletionModal: ModalProps = {
  type: "error",
  title: "Failed to Delete Snippet",
  size: "sm",
  content: "Failed to delete snippet, please try again.",
};

export const failedFolderRenameModal: ModalProps = {
  type: "error",
  title: "Failed to Rename Folder",
  size: "sm",
  content: "Failed to rename folder, please try again.",
};

// Specific Errors
export const sessionExpiredModal: ModalProps = {
  type: "error",
  title: "Session Expired",
  size: "sm",
  content: "Please log in again to continue.",
};

export const noSelectedFolderModal: ModalProps = {
  type: "error",
  title: "No Folder Selected",
  size: "sm",
  content: "Please select a folder first.",
};

export const noSelectedSnippetModal: ModalProps = {
  type: "error",
  title: "No Snippet Selected",
  size: "sm",
  content: "Please select a snippet first.",
}

export const noFoldersModal: ModalProps = {
  type: "error",
  title: "No Folders",
  size: "sm",
  content: "There are currently no existing folders.",
}

// export const snippetDeleted: ModalProps = {
//   type: "error",
//   title: "Session Expired",
//   size: "sm",
//   content: "Please log in again to continue.",
// };