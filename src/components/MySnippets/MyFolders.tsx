import { useEffect, useState } from "react";
import Styles from "../../styles/Styles";
import SnippetFile from "./SnippetFile";
import AddSnippetMenu from "./AddSnippetMenu";
import Folder from "./Folder";

interface Snippet {
    id: number;
    title: string;
    language: string;
    content: string;
	updatedAt: Date;
}

interface Folder {
    id: number;
    name: string;
    snippets: Snippet[];
}

const MyFolders = () => {
	// States
	const [selectedSnippet, setSelectedSnippet] = useState(1);
	const [showAddSnippetMenu, setShowAddSnippetMenu] = useState(false);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [menu, setMenu] = useState<{ 
		visible: boolean; 
		x: number; 
		y: number; 
		type: "file" | "folder" | "empty" | ""; 
		target?: string; 
	}>({
		visible: false,
		x: 0,
		y: 0,
		type: "",
	});

	const fetchData = async () => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				console.error("No token found, user must login first.");
				return;
			}

			// Get user folder and snippet data
			// Fetch folders
			const folderResponse = await fetch('http://localhost:3000/api/folders', {
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
			});

			const folderData = await folderResponse.json();

			const snippetResponse = await fetch('http://localhost:3000/api/snippets', {
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
			});

			const snippetData = await snippetResponse.json();

			// Update folders and snippets state
			if (folderResponse.ok) setFolders(folderData.data);
			if (snippetResponse.ok) setSnippets(snippetData.data);
		}  catch (err) {
			console.error("Error fetching data:", err);
			alert("An error occured while trying to fetch user data.");
		}
	};

	// [EFFECT] Fetch data (user folders and snippets)
	useEffect(() => {
		fetchData();
	}, []);

	// [HANDLE] Toggle visibility of add snippet modal
	const toggleSnippetMenu = () => {
		setShowAddSnippetMenu(prev => !prev);
	};

	// [HANDLE] Add a folder in the file hierarchy
	const handleAddFolder = async (name: string) => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch('http://localhost:3000/api/folders', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({ name }),
			});

			const data = await response.json();

        if (response.ok) {
            console.info(`Folder "${name}" added successfully.`);
            alert("Folder created!");
            setFolders(prev => [...prev, data.data]);
        } else {
            console.error("Failed to add folder:", data.message);
            alert(data.message || "Failed to add folder.");
        }
		} catch (err) {
			console.error("Error adding folder:", err);
			alert("An error occurred while adding folder.");
		}
	};

	// [HANDLE] User right clicks file area
	const handleEmptyAreaContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'empty' });
	};

	// [HANDLE] User right clicks folder
	const handleFolderContextMenu = (e: React.MouseEvent, folderName: string) => {
		e.preventDefault();
		e.stopPropagation();

		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'folder', target: folderName });
	};

	// [HANDLE] User right clicks snippet file
	const handleSnippetFileContextMenu = (e: React.MouseEvent, fileName: string) => {
		e.preventDefault();
		e.stopPropagation();

		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'file', target: fileName });
	};

	// [HANDLE] User clicks outside context menu
	const handleOutsideClick = () => {
		if (menu.visible) setMenu({ ...menu, visible: false })
	};

		// [HANDLE] File operations
	const handleRenameSnippet = () => {
		setMenu({ ...menu, visible: false });
	};

	const handleDeleteSnippet = () => {
		setMenu({ ...menu, visible: false });
	};

	const handleAddSnippet = () => {
		toggleSnippetMenu();
		setMenu({ ...menu, visible: false });
	};
	
	// [HANDLE] File operations
	const handleRenameSnippet = () => {
		setMenu({ ...menu, visible: false });
	};

	const handleDeleteSnippet = () => {
		setMenu({ ...menu, visible: false });
	};

	const handleAddSnippet = () => {
		toggleSnippetMenu();
		setMenu({ ...menu, visible: false });
	};

	return (
	<div className={Styles.container}>
		{/* Modal - Add Snippet */}
		{showAddSnippetMenu ? (
			<div className="">
				<AddSnippetMenu onClose={toggleSnippetMenu}/>
			</div>
		) : ( // File Hierarchy
		<>
		<div className="col-span-2  border-[rgba(131,131,131,0.2)] flex flex-col shadow-md bg-[var(--secondary)]">
			{/* Folders */}
			{folders.map((folder, index) => (
				<button
				onClick={() => setSelectedSnippet(index + 1)}
				onContextMenu={(e) => handleFolderContextMenu(e, folder.name)}
				className={`${Styles.folderShortcut} ${index === selectedSnippet - 1 && 'shadow-sm bg-white text-[var(--primary)]'}`}>{folder.name}</button>
			))}
		</div>

		{/* File Explorer */}
		<div
		onClick={handleOutsideClick}
		onContextMenu={handleEmptyAreaContextMenu}
		className="border border-l-0 border-[rgba(90,90,90,0.2)] col-span-5 shadow-md bg-white flex flex-col items-center min-h-100">
			{/* Header */}
			<span className="w-full flex justify-between px-4 py-2 [&>p]:text-xs">
				<p>Name</p>
				<p>Language</p>
				<p>Date Modified</p>
			</span>

				{/* Snippets */}
				<div className="w-full">
					{snippets.map((snippet, index) => (
						<div
							key={snippet.id}
							onClick={() => setSelectedSnippet(index + 1)}
							className={Styles.folderItem}
							onContextMenu={(e) => handleSnippetFileContextMenu(e, snippet.title)}
						>
							<SnippetFile fileData={snippet} />
						</div>
					))}
				</div>

				{/* Context Menu */}
				{menu.visible && (
					<div
						style={{
							top: menu.y,
							left: menu.x,
						}}
						className="absolute flex flex-col items-start bg-white border border-gray-300 rounded-md p-1 shadow-md"
					>
						{menu.type === "file" ? (
							<>
								<button onClick={handleRenameSnippet} className={Styles.snippetFileButton}>
									Rename Snippet
								</button>
								<button onClick={handleDeleteSnippet} className={Styles.snippetFileButton}>
									Delete Snippet
								</button>
							</>
						) : (
							<>
								<button onClick={handleAddSnippet} className={Styles.snippetFileButton}>
									New Snippet
								</button>
								<button onClick={() => handleAddFolder("New Folder")} className={Styles.snippetFileButton}>
									New Folder
								</button>
							</>
						)}
					</div>
				)}
		</div>
		</>
		)}
	</div>
	);
};

export default MyFolders;