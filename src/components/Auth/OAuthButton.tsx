import Styles from "../../styles/Styles";

interface OAuthButtonProps {
    label: string;
    iconUrl: string;
    onClick?: () => void;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ label, iconUrl, onClick }) => {
    return (
        <button onClick={onClick} className={Styles.secondaryButton}>
            <img src={`/${iconUrl}`} className=" w-4 h-4"/>
            <p className="text-xs text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--background)]">{label}</p>
        </button>
    );
};

export default OAuthButton;