// [IMPORT] Styles
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";

const MySnippets = () => {
    document.title = "Snippify: My Snippets";
    
    const [user, setUser] = useState(null);

    // [EFFECT] Retrieve user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div>
            {/* Overview Section */}
            <div>
                <h3>{}</h3>
            </div>
            <Footer/>
        </div>
  );
};

export default MySnippets;