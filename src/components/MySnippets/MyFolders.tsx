import { useEffect, useRef, useState } from "react";
import Styles from "../../styles/Styles";
import SnippetFile from "./SnippetItem";
import FolderItem from "./FolderItem";
import { fetchUserData, getToken } from "../../utils/auth";
import { useModal } from "../../context/ModalContext";
import type { Folder, Snippet, SnippetData } from "../../utils/types";
import NewSnippetForm from "./NewSnippetForm";

const MyFolders = () => {
	// States
	const [selectedSnippet, setSelectedSnippet] = useState(1);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [snippetData, setSnippetData] = useState<SnippetData>({
    title: '',
    language: '',
    content: ''
	});
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
	const { openModal, closeModal } = useModal();
	
	// [EFFECT] Fetch user data on mount (user folders and snippets)
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchUserData();

			// If data exists, update folders and snippets states
			if (data) {
				setFolders(data.folders);
				setSnippets(data.snippets);
			}
		};

		fetchData();
	}, []);

	// ============================== General Implementation ==============================
	// [HANDLE: Hide/Close Menu] When user clicks outside the context menu
	const handleOutsideClick = () => {
		if (menu.visible) setMenu({ ...menu, visible: false })
	};

	// [HANDLE: Show Menu] When user right clicks the snippet files' empty area
	const handleEmptyAreaContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'empty' });
	};

	// ============================== Snippets Implementation ==============================
	// [HANDLE: Show Menu] When user right clicks a snippet file
	const handleSnippetFileContextMenu = (e: React.MouseEvent, fileName: string) => {
		e.preventDefault();
		e.stopPropagation();

		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'file', target: fileName });
	};

	// [HANDLE: Add Snippet] Send a request to create a new snippet for the current user and update the local state
	const handleAddSnippet = async (snippetData: Omit<Snippet, 'id' | 'updatedAt'>) => {
		try {
			const token = getToken();
			const response = await fetch('http://localhost:3000/api/snippets', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify(snippetData),
			});

			const data = await response.json();

			// If successful request, update folders state 
			if (response.ok) {
				console.info(`Snippet "${snippetData.title}" created successfully.`);
				alert("Snippet created!");
				setSnippets(prev => [...prev, data.data]);
			} else {
				console.error("Failed to create snippet:", data.message);
				alert(data.message || "Failed to create snippet.");
			}
		} catch (err) {
			console.error("Error creating snippet:", err);
			alert("An error occurred while creating snippet.");
		}
	};

	// [HANDLE: Rename Snippet] Send a request to rename the user's selected folder and update the local state
	const handleRenameSnippet = () => {
		
	};

	// [HANDLE: Delete Snippet] Send a request to delete the user's selected folder and update the local state
	const handleDeleteSnippet = () => {
		
	};

	// ============================== Folders Implementation ==============================
	// [HANDLE: Show Menu] When user right clicks a folder
	const handleFolderContextMenu = (e: React.MouseEvent, folderName: string) => {
		e.preventDefault();
		e.stopPropagation();

		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'folder', target: folderName });
	};
	
	// [HANDLE: Add Folder] Send a request to create a new folder for the current user and update the local state
	const handleAddFolder = async (name: string) => {
		try {
			const token = getToken();
			const response = await fetch('http://localhost:3000/api/folders', {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({ name }),
			});

			const data = await response.json();

			// If successful request, update folders state 
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

	// [HANDLE: Rename Folder] Send a request to rename the user's selected folder and update the local state
	const handleRenameFolder = () => {
		
	};

	// [HANDLE: Delete Folder] Send a request to delete the user's selected folder and update the local state
	const handleDeleteFolder = () => {
		
	};

	// ============================== Modal Display Implementation ==============================
	const handleShowNewSnippetModal = () => {
	openModal({
		type: 'prompt',
		title: 'Create Snippet',
		size: 'lg',
		children: (
		<NewSnippetForm
			onSubmit={data => {
				handleAddSnippet(data); // Directly call handleAddSnippet with form data
                closeModal(); // Close the modal after submission
			}}
		/>
		)
	});
	};

	return (
	<div className={Styles.container}>
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
				<div className="w-full h-full">
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
						{menu.type === "file" && (
							<>
								<button onClick={handleRenameSnippet} className={Styles.snippetFileButton}>
									Rename Snippet
								</button>
								<button onClick={handleDeleteSnippet} className={Styles.snippetFileButton}>
									Delete Snippet
								</button>
							</>
						)}
						
						{menu.type === "empty" && (
							<>
								<button onClick={handleShowNewSnippetModal} className={Styles.snippetFileButton}>
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
	</div>
	);
};

export default MyFolders;