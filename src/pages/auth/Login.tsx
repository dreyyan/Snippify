import Styles from "../../styles/Styles";

// [IMPORT] Components
import LoginPanel from "../../components/Auth/Login/LoginPanel";
import SlideshowPanel from "../../components/Auth/SlideshowPanel";

const Login = () => {
    document.title = "Snippify: Login"

    return (
        <div className="flex flex-1">
            {/* Login Panel */}
            <div className={Styles.loginPanel}>
                <LoginPanel/>
            </div>
            
            {/* Feature Slideshow */}
            <div className="w-1/2 bg-[linear-gradient(to_bottom,var(--primary),var(--secondary))] overflow-hidden">
                <SlideshowPanel/>
            </div>
        </div>
    );
};

export default Login;