import { useState } from "react";
import Styles from "../../styles/Styles";;

const DeleteFolderForm: React.FC<{ folderName: string, onSubmit: (name: string) => void, handleCloseModal: () => void }> = ({ folderName, onSubmit, handleCloseModal }) => {
    const [inputField, setInputField] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputField !== folderName) {
            alert("Folder name does not match. Please type the exact folder name to confirm.");
            return;
        }
        onSubmit(inputField);
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
		<p>
			Are you sure you want to delete the folder{" '"}
			<strong>{folderName}</strong>{"'"}? If so, please type{" '"}
			<strong>{folderName}</strong>{"'"} below to confirm.
		</p>
        <input
        type="text"
        placeholder={folderName}
        value={inputField}
        onChange={e => setInputField(e.target.value)}
        className={Styles.formInput}
        />
        <div className="flex justify-end gap-x-4">
            <button type="button" onClick={handleCloseModal} className={Styles.secondaryButton}>Close</button>
            <button
            type="submit"
            disabled={inputField !== folderName}
            className={`
                ${inputField !== folderName ? 'bg-[var(--text-secondary)]/60' : 'bg-[var(--primary)] hover:bg-[#018ec2]'}
            transition-colors duration-200 text-xs font-bold w-16 px-2 py-2 rounded-full text-[var(--text-on-primary)] cursor-pointer
            `}>Delete</button>
        </div>
    </form>
    );
};

export default DeleteFolderForm;