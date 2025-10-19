import { useNavigate } from "react-router-dom";
import Styles from "../../styles/Styles";

const AuthButtons = () => {
    const navigate = useNavigate();

    const handleSignUpNavigation = () => {
        navigate('/sign-up');
    };
    return (
        <div className="space-x-4 [&>button]:cursor-pointer">
            <button className="text-sm font-[500] tracking-normal text-[var(--text-primary)] transition-colors duration-300 hover:text-[var(--text-secondary)]">Login</button>
            <button onClick={handleSignUpNavigation} className="text-sm font-bold px-4 py-2 rounded-full text-[var(--text-on-primary)] bg-[var(--primary)] transition-all duration-200 hover:bg-[#0081AF] hover:scale-102">Get Started</button>
        </div>
    );
};

export default AuthButtons;