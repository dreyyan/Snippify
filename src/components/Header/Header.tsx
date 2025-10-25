import { Link } from "react-router-dom";
import Styles from "../../styles/Styles";
import Banner from "./Banner";
import ProfileSection from "./ProfileSection";
import { useEffect, useState } from "react";
import AuthButtons from "./AuthButtons";

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    const updateLoggedInState = () => {
        const token = localStorage.getItem("token");
        if (token) setLoggedIn(true);
    };

    useEffect(() => {
        updateLoggedInState();
    }, []);

    // [HANDLE] Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
    };

    return (
        <div className={Styles.headerContainer}>
            {/* [L]eft: Banner */}
            <div className="">
                <Banner/>
            </div>

            {/* [C]enter: Navigation Links */}
            <div className="space-x-6 ml-auto pr-12">
               <Link to="/dashboard" className={Styles.headerLink}>Dashboard</Link>
               <Link to="/my-snippets" className={Styles.headerLink}>My Snippets</Link>
               <Link to="/my-links" className={Styles.headerLink}>My Links</Link>
            </div>

            {/* [R]ight: Auth Buttons / Profile Section */}
            <div>
                { loggedIn === true ? <ProfileSection onLogout={handleLogout}/> : <AuthButtons/>}
            </div>
        </div>
    );
};

export default Header;