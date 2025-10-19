import { Link } from "react-router-dom";
import Styles from "../../styles/Styles";

// [IMPORT] Components
import SignUpForm from "./SignUpForm";
import OAuthButton from "./OAuthButton";

const SignUpPanel = () => {
    const handleGoogleSignUp = () => {
        
    };

    const handleFacebookSignUp = () => {

    };

    const handleGitHubSignUp = () => {

    };

    return (
        <div className="">
            {/* Banner */}
            <div className="flex space-x-2">
                <img src="/snippify-icon.svg" className="w-6"/>
                <span className="flex items-center"><h3 className="text-[var(--text-primary)]">Snip</h3><h3 className="text-[var(--primary)]">pify</h3></span>
            </div>
            {/* Sign Up Form */}
            <div className="mt-20">
                <SignUpForm/>
            </div>
            {/* Other Options */}
            <div className="flex justify-between mb-6">
                <span className="flex gap-x-2">
                    <input type="checkbox" className="accent-[var(--primary)]"/><p className="text-[12px]">Remember Me</p>
                </span>
                <Link to="/forgot-password" className="text-xs text-[var(--secondary)] underline underline-offset-2 transition-colors duration-300 hover:text-[var(--text-secondary)]">Forgot password?</Link>
            </div>
            {/* Sign Up Button */}
            <button className={Styles.primaryButton}>Sign Up</button>
            {/* Divider */}
            <div className="flex items-center my-4 space-x-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <p className="text-[10px] text-[var(--text-secondary)]">OR</p>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>
            {/* OAuth Buttons */}
            <div className="space-y-2">
                <OAuthButton label="GitHub" iconUrl="github-icon.svg" onClick={handleGitHubSignUp}/>
                <OAuthButton label="Google" iconUrl="google-icon.png" onClick={handleGoogleSignUp}/>
                <OAuthButton label="Facebook" iconUrl="fb-icon.png" onClick={handleFacebookSignUp}/>
            </div>
        </div>
    );
};

export default SignUpPanel;