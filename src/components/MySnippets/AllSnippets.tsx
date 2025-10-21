import Styles from "../../styles/Styles";

const AllSnippets = () => {
    return (
      <div className={Styles.container}>
        {/* File Hierarchy */}
        <div className="flex flex-col border px-2 py-4">
          <button className={Styles.folderShortcut}>All</button>
          <button className={Styles.folderShortcut}>Recents</button>
          <button className={Styles.folderShortcut}>Favorites</button>
        </div>
        {/* File Explorer */}
        <div className="col-span-4 border flex flex-col items-center">
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
          <button className={Styles.fileItem}>File</button>
        </div>
      </div>
    );
};

export default AllSnippets;