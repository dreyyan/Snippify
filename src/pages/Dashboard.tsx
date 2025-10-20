// [IMPORT] Styles
import "../styles/index.css";
import Styles from "./../styles/Styles";

// [IMPORT] Components
import { useEffect, useState } from "react";

interface User {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
}
const Dashboard = () => {
    document.title = "Snippify: Dashboard";
    
    const [user, setUser] = useState<User|null>(null);

    // [EFFECT] Retrieve user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="px-12 py-6">
            <h3>Welcome, {user?.name || "User"}</h3>
            {/* Welcome Section - Personalized greeting for the user */}
            {/* Quick Stats - Display metrics like snippets created, folders, shared links */}
            {/* Recent Snippets - Show up to 4 recent snippets with view/edit links */}
            {/* Quick Actions - Buttons for creating/viewing snippets */}
            {/* Collaboration Highlights - Highlight team activity with links to My Links */}
            {/* Header and Footer - Consistent navigation and branding */}
        </div>
  );
};

export default Dashboard;