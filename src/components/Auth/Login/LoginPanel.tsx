import { Link } from "react-router-dom";
import Styles from "../../../styles/Styles";

// [IMPORT] Components
import LoginForm from "../Login/LoginForm";
import OAuthButton from "../OAuthButton";
import Divider from "../Divider";
import { useModal } from "../../../context/ModalContext";

const LoginPanel = () => {
    const { openModal } = useModal();

    // [HANDLE] OAuth Login
    const handleGoogleLogin = () => {
        openModal({
            type: 'info',
            title: 'Logging in...',
            content: 'Please wait while we connect your Google account.',
            size: 'sm'
        });
    };

    const handleGitHubLogin = () => {
        openModal({
            type: 'info',
            title: 'Signing in...',
            content: 'Please wait while we connect your GitHub account.',
            size: 'sm'
        });
    };

    return (
        <div className="">
            {/* Login Form */}
            <div className="mt-4 mb-4">
                <LoginForm/>
            </div>

            {/* Divider */}
            <div className="my-4">
                <Divider/>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2 mb-4">
                <OAuthButton type="login" provider="GitHub" onClick={handleGitHubLogin}/>
                <OAuthButton type="login" provider="Google" onClick={handleGoogleLogin}/>
            </div>

            {/* Text Navigation Link */}
            <div className="flex justify-center gap-x-1 text-xs">
                <p className="text-[var(--text-primary)]">Don't have an account?</p>
                <Link to="/sign-up" className={Styles.textLink}>Sign Up</Link>
            </div>
        </div>
    );
};

export default LoginPanel;