// [IMPORT] Styles
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import { useEffect, useState } from "react";
import MyFolders from "../components/MySnippets/MyFolders";
import Drafts from "../components/MySnippets/Recents";
import Favorites from "../components/MySnippets/Favorites";
import { useNavigate } from "react-router-dom";

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

interface User {
    id: number;
    name: string;
    folders: Folder[];
}

const MySnippets = () => {
    document.title = "Snippify: My Snippets";

    const navigate = useNavigate();
    
    // States
    const [folders, setFolders] = useState<Folder[]>();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const tabs = [
        {name: 'My Folders', iconUrl: 'my-folders-icon.svg'},
        {name: 'Drafts', iconUrl: 'drafts-icon.svg'},
        {name: 'Favorites', iconUrl: 'favorites-icon.svg'}
    ];

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
        <div className="flex flex-col px-12 py-6">
            {/* Windows Tab */}
            <div className={Styles.tabsContainer}>
                {tabs && tabs.map((tab, i) => (
                    <button onClick={() => setPage(i + 1)} className={`${Styles.tabButton} ${page === i + 1 && 'bg-white'}`}><img src={`/${tab.iconUrl}`} className="size-4"/>{tab.name}</button>
                ))}
            </div>
            {/* Tab render based on page count */}
            {page === 1 &&
                <MyFolders/>
            }
            {page === 2 &&
                <Drafts/>
            }
            {page === 3 &&
                <Favorites/>
            }
        </div>
  );
};

export default MySnippets;