import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// [IMPORT] Styles
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const About = () => {
    document.title = "Snippify: About";
    
    const [user, setUser] = useState(null);

    // [EFFECT] Retrieve user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <>
            {/* About Section */}
            <div className="flex flex-col items-center gap-y-6 mt-10 px-[20%]">
                <h1 className="text-center text-[#343739] roboto-bold">
                    About <b>Snippify</b>
                </h1>
                <p className="text-center text-[var(--text-secondary)] roboto-regular">
                    Snippify is a platform designed to help developers organize, search, and share code snippets efficiently. 
                    Built with a focus on simplicity and productivity, Snippify supports intuitive file hierarchies, 
                    starting with programming languages and customizable user folders. 
                    Whether you're a solo coder or part of a team, Snippify streamlines your workflow with web and API-first access, 
                    collaboration features, and flexible integrations.
                </p>
                <p className="text-center text-[var(--text-secondary)] roboto-regular">
                    Our mission is to empower developers to <b>snip it, ship it</b>, and make coding more efficient and collaborative.
                </p>
            </div>
            <Footer />
        </>
    );
};

export default About;