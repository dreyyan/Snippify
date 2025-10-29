import { useState } from "react";
import Styles from "../../styles/Styles";;
import { useModal } from "../../context/ModalContext";

const NewFolderForm: React.FC<{ onSubmit: (name: string) => void, handleCloseModal: () => void }> = ({ onSubmit, handleCloseModal }) => {
    const [folderName, setFolderName] = useState("");
    const { openModal, closeModal } = useModal();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // [ERROR] Blank folder name
        if (folderName === "") {
            openModal({
                type: 'error',
                title: 'Error',
                size: 'sm',
                content: "Folder name cannot be blank."
            });
            return;
        }
        onSubmit(folderName);
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        type="text"
        placeholder="e.g. JavaScript"
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
        className={Styles.formInput}
        />
        <div className="flex justify-end">
            <button type="button" onClick={handleCloseModal} className={Styles.secondaryButton}>Close</button>
            <button type="submit" className={Styles.primaryModalButton}>Create</button>
        </div>
    </form>
    );
};

export default NewFolderForm;