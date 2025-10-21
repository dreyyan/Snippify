// [IMPORT] Styles
import AllSnippets from "../components/MySnippets/AllSnippets";
import Drafts from "../components/MySnippets/Recents";
import Favorites from "../components/MySnippets/Favorites";
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import { useEffect, useState } from "react";

interface Snippet {
    id: number;
    title: string;
    language: string;
    content: string;
}
const MySnippets = () => {
    document.title = "Snippify: My Snippets";
    
    // States
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);

    // [EFFECT] Retrieve user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const tabs = [
    { name: 'My Folders', iconUrl: 'my-folders-icon.svg' },
    { name: 'Recents', iconUrl: 'recents-icon.svg' },
    { name: 'Favorites', iconUrl: 'favorites-icon.svg' },
    ];
    
    return (
        <div className="flex flex-col px-12 py-6">
            {/* Windows Tab */}
            <div className={Styles.tabsContainer}>
                {tabs.map((tab, i) => (
                    <button onClick={() => setPage(i + 1)} className={`${Styles.tabButton} ${page === i + 1 && 'bg-white'}`}><img src={`/${tab.iconUrl}`} className="size-4"/>{tab.name}</button>
                ))}
            </div>
            {/* Tab render based on page count */}
            {page === 1 &&
                <AllSnippets/>
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