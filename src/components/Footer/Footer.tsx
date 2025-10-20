import { Link } from "react-router-dom";
import Styles from "../../styles/Styles";

const Footer = () => {

    return (
        <div className={Styles.footerContainer}>
            {/* [C]enter: Navigation Links */}
            <div className="space-x-6">
               <Link to="/about" className={Styles.footerLink}>About</Link>
               <Link to="/privacy-and-policy" className={Styles.footerLink}>Privacy Policy</Link>
               <Link to="/terms-of-service" className={Styles.footerLink}>Terms of Services</Link>
               <Link to="/help-and-support" className={Styles.footerLink}>Help & Support</Link>
            </div>
            <p className="text-xs tracking-wide roboto-medium text-[var(--text-secondary)]">© 2025 Snippify. All rights reserved.</p>
        </div>
    );
};

export default Footer;