// [IMPORT] Styles
import "../styles/index.css";

// [IMPORT] Components
import { useEffect, useState } from "react";
import MyFolders from "../components/MySnippets/MyFolders";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../utils/auth";
import type { User} from "../utils/types";

interface Snippet {
    id: number;
    title: string;
    language: string;
    content: string;
}

interface Folder {
    id: number;
    name: string;
    snippets: Snippet[];
}

const MySnippets = () => {
    document.title = "Snippify: My Snippets";

    const navigate = useNavigate();
    
    // States
    const [folders, setFolders] = useState<Folder[]>();
    const [loading, setLoading] = useState(true);
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

    // [EFFECT] Retrieve user data from local storage
    useEffect(() => {
        const fetchFolders = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You are not logged in!");
                navigate('/login');
                return;
            }

            try {
                const response = await fetch("http://localhost:3000/api/folders", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setFolders(data.data); // assuming backend sends { data: folders }
                } else {
                    console.error("Failed to fetch folders:", data.message);
                }
            } catch (err) {
                console.error("Error fetching folders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFolders();
    }, []);

    if (loading) return <div>Loading...</div>;
    
    return (
        <div className="flex flex-col gap-y-2 h-full mx-16 my-12 px-12 py-10 rounded-xl shadow-xl bg-[#FFFFFF]">
            <span className="flex gap-x-2">
                <p className="text-2xl">Welcome,</p>
                <p className="text-2xl font-semibold">{user?.name || "User"}.</p>
            </span>
            <MyFolders/>
        </div>
  );
};

export default MySnippets;