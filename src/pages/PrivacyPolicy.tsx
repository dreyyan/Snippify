import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// [IMPORT] Styles
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const PrivacyPolicy = () => {
    document.title = "Snippify: Privacy Policy";
    
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
            {/* Privacy Policy Section */}
            <div className="flex flex-col gap-y-6 mt-10 px-[20%]">
                <h1 className="text-center text-[#343739] roboto-bold">
                    Privacy Policy
                </h1>
                <div className="text-[var(--text-secondary)] roboto-regular space-y-4">
                    <h3 className="roboto-bold">1. Introduction</h3>
                    <p>
                        At Snippify, we value your privacy and are committed to protecting your personal information. 
                        This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform.
                    </p>
                    <h3 className="roboto-bold">2. Information We Collect</h3>
                    <p>
                        We collect information you provide, such as your name, email address, and code snippets, 
                        as well as usage data like IP addresses and browsing behavior to improve our services.
                    </p>
                    <h3 className="roboto-bold">3. How We Use Your Information</h3>
                    <p>
                        Your data is used to provide and enhance Snippify's features, including snippet organization, 
                        search functionality, and collaboration tools. We do not sell your personal information.
                    </p>
                    <h3 className="roboto-bold">4. Data Security</h3>
                    <p>
                        We implement industry-standard security measures to protect your data from unauthorized access, 
                        alteration, or disclosure.
                    </p>
                    <h3 className="roboto-bold">5. Your Rights</h3>
                    <p>
                        You have the right to access, update, or delete your personal information. 
                        Contact us at support@snippify.com to exercise these rights.
                    </p>
                    <h3 className="roboto-bold">6. Contact Us</h3>
                    <p>
                        For questions about this Privacy Policy, please reach out to us at support@snippify.com.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;