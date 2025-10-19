import { Link } from "react-router-dom";
import Styles from "../../../styles/Styles";

// [IMPORT] Components
import SignUpForm from "./SignUpForm";
import OAuthButton from "../OAuthButton";

const SignUpPanel = () => {
    const handleGoogleSignUp = () => {
        
    };

    const handleFacebookSignUp = () => {

    };

    const handleGitHubSignUp = () => {

    };

    return (
        <div className="">
            {/* Sign Up Form */}
            <div className="mt-4">
                <SignUpForm/>
            </div>
            {/* Divider */}
            <div className="flex items-center my-4 space-x-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <p className="text-[10px] text-[var(--text-secondary)]">OR</p>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* OAuth Buttons */}
            <div className="space-y-2 mb-4">
                <OAuthButton label="Sign Up with GitHub" iconUrl="github-icon.svg" onClick={handleGitHubSignUp}/>
                <OAuthButton label="Sign Up with Google" iconUrl="google-icon.png" onClick={handleGoogleSignUp}/>
            </div>
            {/* Text Navigation Link */}
            <span className="flex justify-center gap-x-1 text-xs"><p className="text-[var(--text-primary)]">Already have an account?</p><Link to="/login" className={Styles.textLink}>Log In</Link></span>
        </div>
    );
};

export default SignUpPanel;