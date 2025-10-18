import Styles from "../../styles/Styles";

const AuthButtons = () => {
    return (
        <div className="space-x-4 [&>button]:cursor-pointer">
            <button className="text-sm font-[500] tracking-normal text-[var(--text-primary)]">Login</button>
            <button className={Styles.primaryButton}>Get Started</button>
        </div>
    );
};

export default AuthButtons;