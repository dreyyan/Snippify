import { useState, useEffect } from "react";
import Styles from "../../styles/Styles";

// [IMPORT] Components
import MiniHeader from "../../components/Header/MiniHeader";
import SignUpPanel from "../../components/Auth/SignUp/SignUpPanel";
import SlideshowPanel from "../../components/Auth/SlideshowPanel";

const SignUp = () => {
    document.title = "Snippify: Sign Up"

    return (
        <div className="flex flex-1">
            <div className="flex flex-1">
                {/* Sign Up Panel */}
                <div className="w-1/2 pl-20 pr-20 pt-2 bg-[var(--background)]">
                    <SignUpPanel/>
                </div>
                {/* Feature Slideshow */}
                <div className="w-1/2 bg-[linear-gradient(to_bottom,var(--primary),var(--secondary))] overflow-hidden">
                    
                </div>
            </div>
        </div>
    );
};

export default SignUp;