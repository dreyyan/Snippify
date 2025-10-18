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
        </div>
  );
};

export default Home;