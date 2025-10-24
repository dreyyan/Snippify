import Styles from "../../styles/Styles";

interface SnippetFileProps {
    fileData: {
        title: string;
        language: string;
        content: string;
        updatedAt: Date;
    }
};

const SnippetFile: React.FC<SnippetFileProps> = ({ fileData }) => {
    const { title, language, content, updatedAt } = fileData;
    const dateModified = new Date(updatedAt);

    return (
        <button className={Styles.fileItem}>
            <p className="font-semibold">{title}</p>
            <p>{language}</p>
            <p>{content}</p>
            <p>{dateModified.toDateString()}</p>
        </button>
    );
};

export default SnippetFile;