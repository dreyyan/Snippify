import { Link } from "react-router-dom";
import Styles from "../../../styles/Styles";

// [IMPORT] Components
import SignUpForm from "./SignUpForm";
import OAuthButton from "../OAuthButton";
import Divider from "../Divider";
import { useModal } from "../../../context/ModalContext";

const SignUpPanel = () => {
    const { openModal } = useModal();
    
    // [HANDLE] OAuth Sign Up
    const handleGitHubSignUp = () => {
        openModal({
            type: 'info',
            title: 'Signing in...',
            content: 'Please wait while we connect your GitHub account.',
            size: 'sm'
        });
    };

    const handleGoogleSignUp = () => {
        openModal({
            type: 'info',
            title: 'Signing in...',
            content: 'Please wait while we connect your Google account.',
            size: 'sm'
        });
    };

    return (
        <div className="shadow-xl rounded-xl px-8 py-5 pb-6 border-4 border-[var(--primary)] bg-[var(--background)]">
            {/* Sign Up Form */}
            <div className="flex justify-center mt-4">
                <SignUpForm/>
            </div>

            {/* Divider */}
            <div className="my-4">
                <Divider/>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2 mb-4">
                <OAuthButton type="signup" provider="GitHub" onClick={handleGitHubSignUp}/>
                <OAuthButton type="signup" provider="Google" onClick={handleGoogleSignUp}/>
            </div>

            {/* Text Navigation Link */}
            <div className="flex justify-center gap-x-1 text-xs">
                <p className="text-[var(--text-primary)]">Already have an account?</p>
                <Link to="/login" className={Styles.textLink}>Log In</Link>
            </div>
        </div>
    );
};

export default SignUpPanel;