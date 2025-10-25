import Styles from "../../styles/Styles";

interface OAuthButtonProps {
    type: 'login' | 'signup';
    provider: string;
    onClick?: () => void;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({ type, provider, onClick }) => {
    let iconUrl = "";

    // Set icon URL based on provider
    switch (provider) {
        case 'GitHub':
            iconUrl = "github-icon.svg";
            break;
        case 'Google':
            iconUrl = "google-icon.png";
            break;
    }

    return (
        <button onClick={onClick} className={Styles.oAuthButton}>
            <img src={`/${iconUrl}`} className=" w-4 h-4"/>
            <p className="text-xs text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--background)]">{`${type.charAt(0).toUpperCase() + type.slice(1)} ${type === 'login' ? 'with' : 'for' } ${provider}`}</p>
        </button>
    );
};

export default OAuthButton;