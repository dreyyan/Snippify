import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// [IMPORT] Styles
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const TermsOfService = () => {
    document.title = "Snippify: Terms of Service";
    
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
            {/* Terms of Service Section */}
            <div className="flex flex-col gap-y-6 mt-10 px-[20%]">
                <h1 className="text-center text-[#343739] roboto-bold">
                    Terms of Service
                </h1>
                <div className="text-[var(--text-secondary)] roboto-regular space-y-4">
                    <h3 className="roboto-bold">1. Acceptance of Terms</h3>
                    <p>
                        By using Snippify, you agree to these Terms of Service. If you do not agree, please do not use our platform.
                    </p>
                    <h3 className="roboto-bold">2. Use of Service</h3>
                    <p>
                        Snippify provides tools for organizing, searching, and sharing code snippets. 
                        You are responsible for the content you upload and must comply with applicable laws.
                    </p>
                    <h3 className="roboto-bold">3. User Conduct</h3>
                    <p>
                        You agree not to use Snippify to upload malicious code, violate intellectual property rights, 
                        or engage in any unlawful activity.
                    </p>
                    <h3 className="roboto-bold">4. Intellectual Property</h3>
                    <p>
                        You retain ownership of the snippets you upload. By sharing snippets, you grant Snippify a license to display and distribute them as part of the service.
                    </p>
                    <h3 className="roboto-bold">5. Termination</h3>
                    <p>
                        We reserve the right to suspend or terminate your account for violations of these terms.
                    </p>
                    <h3 className="roboto-bold">6. Contact Us</h3>
                    <p>
                        For questions about these Terms of Service, contact us at support@snippify.com.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsOfService;