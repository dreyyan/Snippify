import Styles from "../../styles/Styles";

interface FolderProps {
    name: string;
};

const Folder: React.FC<FolderProps> = ({ name }) => {
    return (
        <button className={Styles.folderItem}>
            <p className="font-semibold">{name}</p>
        </button>
    );
};

export default Folder;