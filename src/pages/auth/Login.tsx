import { useState, useEffect } from "react";
import Styles from "../../styles/Styles";

// [IMPORT] Components
import MiniHeader from "../../components/Header/MiniHeader";
import LoginPanel from "../../components/Auth/Login/LoginPanel";
import SlideshowPanel from "../../components/Auth/SlideshowPanel";

const Login = () => {
    document.title = "Snippify: Login"

    return (
        <div className="min-h-screen flex flex-col">
            <MiniHeader/>
            <div className="flex flex-1">
                {/* Login Panel */}
                <div className="w-1/2 px-20 pt-2 bg-[var(--background)]">
                    <LoginPanel/>
                </div>
                {/* Feature Slideshow */}
                <div className="w-1/2 bg-[linear-gradient(to_bottom,var(--primary),var(--secondary))] overflow-hidden">
                    <SlideshowPanel/>
                </div>
            </div>
        </div>
    );
};

export default Login;