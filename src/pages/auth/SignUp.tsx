// [IMPORT] Components
import Banner from "../../components/Header/Banner";
import SlideshowPanel from "../../components/SignUp/SlideshowPanel";
import SignUpPanel from "../../components/SignUp/SignUpPanel";
import Styles from "../../styles/Styles";

const SignUp = () => {

    return (
        <div className="flex min-h-screen">
            {/* Sign Up Panel */}
            <div className="w-1/2 px-30 py-12 bg-[var(--background)]">
                <SignUpPanel/>
            </div>
            {/* Feature Slideshow */}
            <SlideshowPanel/>
        </div>
    );
};

export default SignUp;