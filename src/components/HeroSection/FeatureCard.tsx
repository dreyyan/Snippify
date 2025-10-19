import Styles from "../../styles/Styles";

interface FeatureCardProps {
    iconUrl: string;
    title: string;
    description: string;    
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, title, description }) => {
    return (
        <div className="flex flex-col items-center transition-transform duration-200 hover:translate-y-[-4px]">
            {/* Feature Icon */}
            <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[var(--primary)] z-1">
                <img src={`/${iconUrl}`} className="w-10 rounded-full p-1 bg-[#FFFFFF]"/>
            </div>
            {/* Feature Title & Description */}
            <div className="max-w-xs text-center border-1 border-gray-100 rounded-md -m-6 px-6 pb-5 pt-7 shadow-md bg-[#FFFFFF]">
                <p className="text-lg leading-loose roboto-bold text-[var(--text-primary)]">{title}</p>
                <p className="w-full leading-tight text-sm roboto-medium text-[var(--text-secondary)]">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;