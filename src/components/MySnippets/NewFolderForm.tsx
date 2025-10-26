import { useState } from "react";
import Styles from "../../styles/Styles";;

const NewFolderForm: React.FC<{ onSubmit: (name: string) => void, handleCloseModal: () => void }> = ({ onSubmit, handleCloseModal }) => {
    const [folderName, setFolderName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(folderName);
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        type="text"
        placeholder="Title"
        value={folderName}
        onChange={e => setFolderName(e.target.value)}
        className={Styles.formInput}
        />
        <div className="flex justify-end gap-x-4">
            <button type="button" onClick={handleCloseModal} className={Styles.secondaryButton}>Close</button>
            <button type="submit" className={Styles.primaryModalButton}>Create</button>
        </div>
    </form>
    );
};

export default NewFolderForm;