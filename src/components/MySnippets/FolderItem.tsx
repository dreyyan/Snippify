import Styles from "../../styles/Styles";

interface FolderItemProps {
    name: string;
};

const FolderItem: React.FC<FolderItemProps> = ({ name }) => {
    return (
        <button className={Styles.folderItem}>
            <p className="font-semibold">{name}</p>
        </button>
    );
};

export default FolderItem;