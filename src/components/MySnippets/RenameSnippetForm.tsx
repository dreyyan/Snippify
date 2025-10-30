import { useState } from "react";
import Styles from "../../styles/Styles";;

const RenameSnippetForm: React.FC<{ onSubmit: (title: string) => void, handleCloseModal: () => void }> = ({ onSubmit, handleCloseModal }) => {
    const [snippetName, setSnippetName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(snippetName);
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        type="text"
        placeholder="Enter a new snippet name..."
        value={snippetName}
        onChange={e => setSnippetName(e.target.value)}
        className={Styles.formInput}
        />
        <div className="flex justify-end gap-x-4">
            <button type="button" onClick={handleCloseModal} className={Styles.secondaryButton}>Close</button>
            <button type="submit" className={Styles.primaryModalButton}>Rename</button>
        </div>
    </form>
    );
};

export default RenameSnippetForm;