import Styles from "../../styles/Styles";

interface SnippetItemProps {
    fileData: {
        title: string;
        language: string;
        content: string;
        updatedAt: Date;
    }
};

const SnippetItem: React.FC<SnippetItemProps> = ({ fileData }) => {
    const { title, language, content, updatedAt } = fileData;
    const dateModified = new Date(updatedAt);

    return (
        <button className={Styles.snippetItem}>
            <p className="font-semibold">{title}</p>
            <p>{language}</p>
            <p>{dateModified.toDateString()}</p>
        </button>
    );
};

export default SnippetItem;