import Styles from "../../styles/Styles";

interface SnippetFileProps {
    title: string;
    language: string | "unknown";
    updatedAt: Date;
};

const SnippetFile: React.FC<SnippetFileProps> = ({ title, language, updatedAt }) => {
    return (
        <button className={Styles.fileItem}>
            <p>{title}</p>
            <p>{language}</p>
            <p>{updatedAt.toDateString()}</p>
        </button>
    );
};

export default SnippetFile;