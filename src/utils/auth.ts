import type { User } from "./types";

// [FUNCTION] Get user token for user authentication
const getToken = (): string => {
    const token = localStorage.getItem("token");

    // [ERROR] Missing token
    if (!token) {
        throw new Error("No token found. User must login first.");
    } return token;
};

// [FUNCTION] Fetch user data from backend
const fetchUserData = async (userId: number): Promise<User | undefined> => {
    try {
        const token = getToken();

        // Get user's folders and snippets data
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        })

        const data = await response.json();

        // [ERROR] Error folders or snippets response
        if (!response.ok) {
            throw new Error("Failed to fetch user data");
        }

        return data.data as User;
    }  catch (err) {
        console.error("Error fetching data:", err);
        alert("An error occured while trying to fetch user data.");
    }
};

// [FUNCTION] Fetch user folders and snippets from backend
const getUserFoldersAndSnippets = async () => {
    try {
        const token = getToken();

        // Get user's folders and snippets data
        const [foldersResponse, snippetsResponse] = await Promise.all([
            fetch('http://localhost:3000/api/folders', {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        }),
            fetch('http://localhost:3000/api/snippets', {
            headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        }),
        ]);

        const foldersData = await foldersResponse.json();
        const snippetsData = await snippetsResponse.json();

        // [ERROR] Error folders or snippets response
        if (!foldersResponse.ok || !snippetsResponse.ok) {
            throw new Error("Failed to fetch user data");
        }

        return { folders: foldersData.data, snippets: snippetsData.data }
    }  catch (err) {
        console.error("Error fetching data:", err);
        alert("An error occured while trying to fetch user data.");
    }
};

export { getToken, fetchUserData, getUserFoldersAndSnippets };