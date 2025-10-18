import { useNavigate } from "react-router-dom";
import "../styles/index.css";
import Styles from "./../styles/Styles";
import Header from "../components/Header/Header";

const Home = () => {
    const navigate = useNavigate();

    // [HANDLE] Login & Sign Up
    const handleLoginNavigation = () => {
        navigate("/dashboard")
    }

    const handleSignUpNavigation = () => {
        navigate("/sign-up");
    }

    // [HANDLE] OAuth Login
    const handleFacebookLogin = () => {
        alert("Logging in via Facebook...")
    }

    const handleGoogleLogin = () => {
        alert("Logging in via Google...")
    }

    return (
        <div className="hero-gradient">
            <Header/>
            {/* Hero Section */}
            <div className="flex flex-col items-center gap-y-4 mt-10 px-[20%]">
                <h1 className="">Snip it, Ship it.</h1>
                <p className="text-center">Organize, search, and share code snippets in intuitive file hierarchies—starting with programming languages and customizable user folders.</p>
            </div>
        </div>
  );
};

export default Home;