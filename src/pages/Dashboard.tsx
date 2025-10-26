// [IMPORT] Styles
import "../styles/index.css";

// [IMPORT] Components
import { useEffect, useState } from "react";
import { fetchUserData } from "../utils/auth";
import type { User} from "../utils/types";

const Dashboard = () => {
    document.title = "Snippify: Dashboard";
    
    const [user, setUser] = useState<User|null>(null);

	// [EFFECT] Fetch user data on mount (user info)
	useEffect(() => {
		const fetchData = async () => {
            const user = localStorage.getItem("user");
            
            // [ERROR] Missing user
            if (!user) return;

            // Get user ID from data
            const parsedUser = JSON.parse(user);
            const userId = parsedUser.id;

            // Fetch actual user data
			const data = await fetchUserData(userId);

            console.log(data);
			// If data exists, update folders and snippets states
			if (data) {
				setUser(data);
			}
		};

		fetchData();
	}, []);

    return (
        <div className="px-12 py-7">
            <h2>Welcome, {user?.name || "User"}.</h2>
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