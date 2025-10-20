import { Link } from "react-router-dom";
import Styles from "../../../styles/Styles";
import { useNavigate } from "react-router-dom";

// [IMPORT] Components
import LoginForm from "../Login/LoginForm";
import OAuthButton from "../OAuthButton";

const LoginPanel = () => {
    const navigate = useNavigate();

    // [HANDLE] OAuth Login
    const handleGoogleLogin = () => {
        
    };

    const handleGitHubLogin = () => {

    };

    return (
        <div className="">
            {/* Login Form */}
            <div className="mt-4">
                <LoginForm/>
            </div>
            {/* Divider */}
            <div className="flex items-center my-4 space-x-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <p className="text-[10px] text-[var(--text-secondary)]">OR</p>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* OAuth Buttons */}
            <div className="space-y-2 mb-4">
                <OAuthButton label="Login with GitHub" iconUrl="github-icon.svg" onClick={handleGitHubLogin}/>
                <OAuthButton label="Login with Google" iconUrl="google-icon.png" onClick={handleGoogleLogin}/>
            </div>
            {/* Text Navigation Link */}
            <span className="flex justify-center gap-x-1 text-xs"><p className="text-[var(--text-primary)]">Don't have an account?</p><Link to="/sign-up" className={Styles.textLink}>Sign Up</Link></span>
        </div>
    );
};

export default LoginPanel;