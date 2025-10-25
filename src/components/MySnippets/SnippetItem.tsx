import { useState } from "react";
import Styles from "../../styles/Styles";
import { useFileWindow } from "../../context/FileWindowContext";

interface SnippetItemProps {
    fileData: {
        title: string;
        language: string;
        content: string;
        updatedAt: Date;
    }
};

const SnippetItem: React.FC<SnippetItemProps> = ({ fileData }) => {
    const { openFileWindow } = useFileWindow();
    const { title, language, content, updatedAt } = fileData;
    const dateModified = new Date(updatedAt);

    // States
    const [isOpen, setIsOpen] = useState(false);

    // [HANDLE] Open the a window for the snippet file
    const handleOpenSnippetFile = () => {
        openFileWindow({
        title: fileData.title,
        language: fileData.language,
        content: fileData.content,
        updatedAt: new Date(fileData.updatedAt),
        })
    };

    return (
        <button onClick={ () => handleOpenSnippetFile()}
        className={Styles.snippetItem}>
            <p className="font-semibold">{title}</p>
            <p>{language}</p>
            <p>{dateModified.toDateString()}</p>
        </button>
    );
};

export default SnippetItem;