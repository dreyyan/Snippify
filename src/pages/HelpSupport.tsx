import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// [IMPORT] Styles
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const HelpSupport = () => {
    document.title = "Snippify: Help & Support";
    
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
            {/* Help & Support Section */}
            <div className="flex flex-col gap-y-6 mt-10 px-[20%]">
                <h1 className="text-center text-[#343739] roboto-bold">
                    Help & Support
                </h1>
                <div className="text-[var(--text-secondary)] roboto-regular space-y-4">
                    <h3 className="roboto-bold">1. Getting Started</h3>
                    <p>
                        Snippify allows you to organize, search, and share code snippets. Sign up or log in to start creating folders and saving snippets in your preferred programming languages.
                    </p>
                    <h3 className="roboto-bold">2. FAQs</h3>
                    <p>
                        <b>How do I create a snippet?</b><br />
                        Navigate to "My Snippets," click "New Snippet," and fill in the details, including code, language, and optional tags.
                    </p>
                    <p>
                        <b>Can I share snippets with my team?</b><br />
                        Yes, use the collaboration features to share snippets via links or export them in JSON or VS Code formats.
                    </p>
                    <h3 className="roboto-bold">3. Troubleshooting</h3>
                    <p>
                        If you encounter issues, try clearing your browser cache or logging out and back in. 
                        For persistent problems, contact our support team.
                    </p>
                    <h3 className="roboto-bold">4. Contact Us</h3>
                    <p>
                        For further assistance, email us at <a href="mailto:support@snippify.com" className={Styles.textLink}>support@snippify.com</a> or visit our community forums.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HelpSupport;