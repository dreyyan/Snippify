import { useState } from "react";
import Styles from "../../styles/Styles";;
import type { SnippetData } from "../../utils/types";

const NewSnippetForm: React.FC<{ onSubmit: (data: SnippetData) => void, handleCloseModal: () => void }> = ({ onSubmit, handleCloseModal }) => {
    const [data, setData] = useState<SnippetData>({
		title: "",
		language: "",
		content: "",
	});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data); // Pass the form data to the parent component
    };

    return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
        type="text"
        placeholder="Title"
        value={data.title}
        onChange={e => setData({ ...data, title: e.target.value })}
        className={Styles.formInput}
        />
        <select
        value={data.language}
        onChange={e => setData({ ...data, language: e.target.value })}
        className={Styles.formInput}
        >
        <option value="">Select Language</option>
        <option value="JavaScript">JavaScript</option>
        <option value="TypeScript">TypeScript</option>
        <option value="Python">Python</option>
        <option value="C++">C++</option>
        <option value="Java">Java</option>
        <option value="Go">Go</option>
        <option value="Rust">Rust</option>
        <option value="Ruby">Ruby</option>
        </select>
        <textarea
        placeholder="Content"
        value={data.content}
        onChange={e => setData({ ...data, content: e.target.value })}
        className={Styles.formInput}
        />
        <div className="flex justify-end gap-x-4 mt-2">
            <button type="button" onClick={handleCloseModal} className={Styles.secondaryButton}>Close</button>
            <button type="submit" className={Styles.primaryModalButton}>Create</button>
        </div>
    </form>
    );
};

export default NewSnippetForm;