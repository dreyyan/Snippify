import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    // [HANDLE] Navigate to 
    const handleBannerClick = () => {
        navigate('/');
    };
    return (
        <button onClick={handleBannerClick} className="group cursor-pointer flex items-center space-x-3 transition-transform duration-300 hover:-translate-x-1">
            <img src="/snippify-icon.svg" className="w-8 transition-transform duration-300 group-hover:translate-x-4"/>
            <span className="flex"><h1 className="text-[var(--text-primary)]">Snip</h1><h1 className="text-[var(--primary)]">pify</h1></span>
        </button>
    );
};

export default Banner;