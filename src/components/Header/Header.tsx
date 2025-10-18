import { Link } from "react-router-dom";
import Styles from "../../styles/Styles";
import Banner from "./Banner";
import ProfileSection from "./ProfileSection";
import { useState } from "react";
import AuthButtons from "./AuthButtons";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className={Styles.headerContainer}>
            {/* [L]eft: Banner */}
            <div className="">
                <Banner/>
            </div>

            {/* [C]enter: Navigation Links */}
            <div className="space-x-6 ml-auto pr-12">
               <Link to="/dashboard" className={Styles.headerLink}>Dashboard</Link>
               <Link to="/dashboard" className={Styles.headerLink}>My Snippets</Link>
               <Link to="/dashboard" className={Styles.headerLink}>My Links</Link>
            </div>

            {/* [R]ight: Auth Buttons / Profile Section */}
            <div>
                { loggedIn === true ? <ProfileSection/> : <AuthButtons/>}
            </div>
        </div>
    );
};

export default Header;