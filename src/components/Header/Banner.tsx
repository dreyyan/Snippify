import Styles from "../../styles/Styles";

const Banner = () => {
    return (
        <div className="flex space-x-3">
            <img src="/snippify-icon.svg" className="w-8"/>
            <span className="flex"><h1 className="text-[var(--text-primary)]">Snip</h1><h1 className="text-[var(--primary)]">pify</h1></span>
        </div>
    );
};

export default Banner;