import Styles from "../../styles/Styles";
import Banner from "./Banner";

const MiniHeader = () => {
    return (
        <div className={Styles.headerContainer}>
            <Banner/>
        </div>
    );
};

export default MiniHeader;