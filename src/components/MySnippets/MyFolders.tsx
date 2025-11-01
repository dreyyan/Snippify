import { useEffect, useState } from "react";
import Styles from "../../styles/Styles";
import SnippetItem from "./SnippetItem";
// import FolderItem from "./FolderItem";
import { getUserFoldersAndSnippets, getToken } from "../../utils/auth";
import { useModal } from "../../context/ModalContext";
import type { Folder, Snippet } from "../../utils/types";
import NewSnippetForm from "./NewSnippetForm";
import NewFolderForm from "./NewFolderForm";
import RenameFolderForm from "./RenameFolderForm";
import { failedFolderCreationModal, failedFolderDeletionModal, failedFolderRenameModal, failedSnippetCreationModal, failedSnippetDeletionModal, failedSnippetRenameModal, folderCreatedModal, folderDeletedModal, folderRenamedModal, generalErrorModal, noFoldersModal, noSelectedFolderModal, noSelectedSnippetModal, snippetCreatedModal, snippetDeletedModal, snippetRenamedModal } from "../../utils/openPresets";
import RenameSnippetForm from "./RenameSnippetForm";
import DeleteFolderForm from "./DeleteFolderForm";

const MyFolders = () => {
	// States
	const [selectedSnippet, setSelectedSnippet] = useState(0);
	const [selectedFolder, setSelectedFolder] = useState(0);
	const [folders, setFolders] = useState<Folder[]>([]);
	const [snippets, setSnippets] = useState<Snippet[]>([]);
	const [menu, setMenu] = useState<{ 
		visible: boolean;
		x: number;
		y: number;
		type: "folder" | "file" | "foldersArea" | "snippetFilesArea" | ""; 
		target?: string; 
	}>({
		visible: false,
		x: 0,
		y: 0,
		type: "",
	});
	const [searchbarInput, setSearchbarInput] = useState("");
	const { openModal, closeModal } = useModal();

	// * [LOGIC] Snippet count for selected folder
	// Filter snippets for the selected folder
	const visibleSnippets = snippets.filter(
		snippet => snippet.folderId === selectedFolder
	);

	const snippetCount = visibleSnippets.length;

	// * [EFFECT] Fetch user data on mount (user folders and snippets)
	useEffect(() => {
		const fetchData = async () => {
			const data = await getUserFoldersAndSnippets();

			// If data exists, update folders and snippets states
			if (data) {
				setFolders(data.folders);
				setSnippets(data.snippets);
			}
		};

		fetchData();
	}, []);

	// ============================== General Implementation ==============================
	// * [HANDLE: Hide/Close Menu] When user clicks outside the context menu
	const handleOutsideClick = () => {
		if (menu.visible) setMenu({ ...menu, visible: false })
	};

	// * [HANDLE: Show Menu] When user right clicks the snippet files' empty area
	const handleEmptyAreaContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'snippetFilesArea' });
	};

    // * [HANDLE] Search bar input field change
    const handleSearchbarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchbarInput(e.target.value);
    };

	// * [HANDLE] Clear the searchbar input
	const handleClearSearch = () => {
		setSearchbarInput("");	
	};

	// ============================== Snippets Implementation ==============================
	// * [HANDLE: Show Menu] When user right clicks a snippet file
	const handleSnippetFileContextMenu = (e: React.MouseEvent, fileName: string) => {
		e.preventDefault();
		e.stopPropagation();

		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'file', target: fileName });
	};

	// * [HANDLE: Add Snippet] Send a request to create a new snippet for the current user and update the local state
	const handleAddSnippet = async (snippetData: Omit<Snippet, 'id' | 'updatedAt'>) => {
		const folderId = selectedFolder;

		// * [ERROR] Missing folder ID
		if (!folderId) {
			openModal(noSelectedFolderModal);
			return;
		}
  
		try {
			const token = getToken();
			const response = await fetch(`http://localhost:3000/api/snippets/${folderId}`, {
				method: "POST",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
				body: JSON.stringify(snippetData),
			});

			const data = await response.json();

			// If successful request, update folders state 
			if (response.ok) {
				console.info(`Snippet "${snippetData.title}" created successfully.`);
				openModal(snippetCreatedModal);
				setSnippets(prev => [...prev, data.data]);
			} else {
				console.error("Failed to create snippet:", data.message);
				openModal(failedSnippetCreationModal)
			}
		} catch (err: unknown) {
			if (err instanceof Error) console.error(err.message);
			openModal(generalErrorModal());
		}
	};

	// * [HANDLE: Rename Snippet] Send a request to rename the user's selected folder and update the local state
	const handleRenameSnippet = async (title: string) => {
		const snippetId = selectedSnippet;

		// ! [ERROR] Missing snippet ID
		if (!snippetId) {
			openModal(noSelectedSnippetModal);
			return;
		}

		try {
			const token = getToken();
			const response = await fetch(`http://localhost:3000/api/snippets/${snippetId}/rename`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
				body: JSON.stringify({ title }),
			});

			const data = await response.json();

			// If successful request, update folders state 
			if (response.ok) {
				openModal(snippetRenamedModal);
				setSnippets(prev =>
  					prev.map(snippet =>
    					snippet.id === data.data.id ? { ...snippet, title: data.data.title } : snippet
					));
			} else {
				console.error("Failed to rename snippet:", data.message);
				openModal(generalErrorModal());
			}
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			openModal(failedSnippetRenameModal);
		}
	};

	// * [HANDLE: Delete Snippet] Send a request to delete the user's selected folder and update the local state
	const handleDeleteSnippet = async () => {
		const snippetId = selectedSnippet;

		// ! [ERROR] No selected snippet
		if (!snippetId) {
			openModal(noSelectedSnippetModal);
			return;
		}
  
		try {
			const token = getToken();
			const response = await fetch(`http://localhost:3000/api/snippets/${snippetId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
			});

			const data = await response.json();

			// If successful request, update folders state
			if (response.ok) {
				console.info(`Snippet deleted successfully.`);
				openModal(snippetDeletedModal);
				setSnippets(prevSnippets => prevSnippets.filter((snippet) => snippet.id !== snippetId));
			} else {
				console.error("Failed to delete snippet:", data.message);
				openModal(failedSnippetDeletionModal);
			}
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			console.error(generalErrorModal());
		}
	};

	// ============================== Folders Implementation ==============================
	// * [HANDLE: Show Menu] When user right clicks a folder
	const handleFolderContextMenu = (e: React.MouseEvent, folderId: number, folderName: string) => {
		e.preventDefault();
		e.stopPropagation();

		setSelectedFolder(folderId); // Update selected folder
		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'folder', target: folderName });
	};

	// * [HANDLE: Show Menu] When user right click	s a folder
	const handleEmptyFolderAreaContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'foldersArea' });
	};	
	
	// * [HANDLE: Add Folder] Send a request to create a new folder for the current user and update the local state
	const handleAddFolder = async (name: string) => {
		try {
			const token = getToken();
			const response = await fetch('http://localhost:3000/api/folders', {
				method: "POST",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
				body: JSON.stringify({ name }),
			});

			const data = await response.json();

			// If successful request, update folders state 
			if (response.ok) {
				console.info(`Folder "${name}" added successfully.`);
				
				// Display modal
				openModal(folderCreatedModal);

				setFolders(prev => [...prev, data.data]);
			} else {
				console.error("Failed to add folder:", data.message);
				openModal(failedFolderCreationModal);
			}
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			openModal(generalErrorModal());
		}
	};

	// * [HANDLE: Rename Folder] Send a request to rename the user's selected folder and update the local state
	const handleRenameFolder = async (name: string) => {
		const folderId = selectedFolder;

		// ! [ERROR] Missing folder ID
		if (!folderId) {
			openModal(noSelectedFolderModal);
			return;
		}

		try {
			const token = getToken();
			const response = await fetch(`http://localhost:3000/api/folders/${folderId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
				body: JSON.stringify({ name }),
			});

			const data = await response.json();

			// If successful request, update folders state 
			if (response.ok) {
				openModal(folderRenamedModal);
				setFolders(prev => prev.map(folder => folder.id === data.data.id? data.data : folder));
			} else {
				console.error("Failed to rename folder:", data.message);
				openModal(failedFolderRenameModal);
			}
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			openModal(generalErrorModal());
		}
	};

	// * [HANDLE: Delete Folder] Send a request to delete the user's selected folder and update the local state
	const handleDeleteFolder = async (name: string) => {
		const folderId = selectedFolder;

		// ! [ERROR] No selected folder
		if (!folderId) {
			openModal(noSelectedFolderModal);
			return;
		}

		try {
			const token = getToken();
			const response = await fetch(`http://localhost:3000/api/folders/${folderId}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`, },
				body: JSON.stringify({ folderId }),
			});

			const data = await response.json();

			// If successful request, update folders state 
			if (response.ok) {
				console.info(`Folder "${name}" deleted successfully.`);
				openModal(folderDeletedModal);
				setFolders(prev => prev.filter(folder => folder.id !== folderId));

				// Reset selected folder and snippets
				setSelectedFolder(0);
				setSnippets(prev => prev.filter(snippet => snippet.folderId !== folderId));
			} else {
				console.error("Failed to delete folder:", data.message);
				openModal(failedFolderDeletionModal);
			}
		} catch (err) {
			if (err instanceof Error) console.error(err.message);
			openModal(generalErrorModal());
		}	
	};

	// ============================== Modal Display Implementation ==============================
	const handleShowNewSnippetModal = () => {
		if (folders.length === 0) {
			openModal(noFoldersModal);
			return;
		}
		if (selectedFolder === 0) {
			openModal(noSelectedFolderModal);
			return;			
		}
		
		openModal({
			type: 'prompt',
			title: 'Create Snippet',
			size: 'md',
			children: (
			<NewSnippetForm
				onSubmit={data => {
					handleAddSnippet(data);
					closeModal();
				}}
				handleCloseModal={closeModal}
			/>
			)
		});
	};

	const handleShowRenameSnippetModal = () => {
		openModal({
			type: 'prompt',
			title: 'Rename Snippet',
			size: 'sm',
			children: (
				<RenameSnippetForm
				onSubmit={title => {
					handleRenameSnippet(title);
					closeModal();
				}}
				handleCloseModal={closeModal}
				/>
			)
		});
	};

	const handleShowNewFolderModal = () => {
		openModal({
			type: 'prompt',
			title: 'Create Folder',
			size: 'sm',
			children: (
			<NewFolderForm
				onSubmit={name => {
					handleAddFolder(name);
					closeModal();
				}}
				handleCloseModal={closeModal}
			/>
			)
		});
	};

	const handleShowRenameFolderModal = () => {
		openModal({
			type: 'prompt',
			title: 'Rename Folder',
			size: 'sm',
			children: (
				<RenameFolderForm
				onSubmit={name => {
					handleRenameFolder(name);
					closeModal();
				}}
				handleCloseModal={closeModal}
				/>
			)
		});
	};

	const handleShowDeleteFolderModal = () => {
		const folder = folders.find(f => f.id === selectedFolder);

		// ! [ERROR]: No selected folder
		if (!folder) {
			openModal({
			type: "error",
			title: "No Folder Selected",
			content: "Please select a folder to delete.",
			});
			return;
		}

		openModal({
			type: 'prompt',
			title: 'Delete Folder',
			size: 'md',
			children: (
				<DeleteFolderForm
				folderName={folder.name}
				onSubmit={name => {
					handleDeleteFolder(name);
					closeModal();
				}}
				handleCloseModal={closeModal}
				/>
			)
		});
	};

	return (
	<div className={Styles.container}>
			{/* Navigation Pane - Folder (Tree View) */}
			{folders && folders.length > 0 ?
			(
				<div className=" rounded-l-xl flex flex-col col-span-2 border-[rgba(131,131,131,0.2)] shadow-lg bg-[var(--primary)]">
					<div className="flex border-1 border-[rgba(90,90,90,0.2)] shadow-sm rounded-l-sm bg-[#FFFFFF] my-3 mx-3">
						{/* Search Bar */}
						<input
						type="text"
						name="searchbar"
						placeholder="Search folder..."
						value={searchbarInput}
						onChange={handleSearchbarInputChange}
						required className={Styles.searchbarInput}/>
						{/* Close Button */}
						{searchbarInput &&
						<button type="button" onClick={handleClearSearch} className="cursor-pointer">
							<img src="/close-icon.svg" className="size-5"/>
						</button>
						}
					</div>

					<div
					onContextMenu={handleEmptyFolderAreaContextMenu}
					className="bg-[var(--secondary)]/80 flex flex-col flex-1"
					>
					{/* Folders Display */}
					{folders
						.filter((folder) =>
						folder.name.toLowerCase().includes(searchbarInput.toLowerCase()))
						.sort((a, b) => a.name.localeCompare(b.name))
						.map((folder) => (
						<div
						key={folder.id}
						onClick={() => {
							setSelectedFolder(folder.id);
							console.log(`Selected Folder: ${folder.id}`);
						}}
						onContextMenu={(e) => handleFolderContextMenu(e, folder.id, folder.name)}
						className={`${Styles.folderShortcut} ${
							folder.id === selectedFolder ? 'shadow-sm bg-white text-[var(--primary)]' : 'text-[var(--text-on-primary)]/80'
						}`}>
						<span className="text-md">{folder.name}</span>
						{/* Folder - Operations */}
						{folder.id === selectedFolder &&
						<div className="space-x-2">
						<button
							onClick={(e) => {
							e.stopPropagation();
							handleShowRenameFolderModal();
							}}
							className="cursor-pointer hover:opacity-70 transition"
						>
								<img src="/rename-folder-icon.svg" className="size-4" alt="Rename folder" />
						</button>
						<button
							onClick={(e) => {
							e.stopPropagation();
							handleDeleteFolder(folder.name);
							}}
							className="cursor-pointer hover:opacity-70 transition"
						>
								<img src="/delete-folder-icon.svg" className="size-4" alt="Delete folder" />
						</button>
						</div>
						}
						</div>	
					))}
					</div>
				</div>
			) : (
				<div className="col-span-2 flex flex-col justify-center items-center shadow-md text-sm text-[var(--background)] border-[rgba(131,131,131,0.2)] bg-[var(--secondary)]">
					<p>You have no folders yet.</p>
				</div>
			)}

		{/* Snippet Files Area */}
		<div
		onClick={handleOutsideClick}
		onContextMenu={handleEmptyAreaContextMenu}
		className="border border-l-0 border-[rgba(90,90,90,0.2)] col-span-5 shadow-md bg-white flex flex-col min-h-100">
			{/* Details Header */}
			<span className="w-full grid grid-cols-3 px-7 py-2 [&>p]:text-xs shadow-md">
				<p className="text-left">Name</p>
				<p className="text-center">Language</p>
				<p className="text-right">Date Modified</p>
			</span>

			{/* Snippet Files */}
			<div className="w-full h-full px-3 py-3 space-y-1 bg-[var(--background)]">
				{snippets
				.filter(snippet => snippet.folderId === selectedFolder)
				.map((snippet) => (
					<div
					key={snippet.id}
					onMouseEnter={() => setSelectedSnippet(snippet.id)}
					onContextMenu={(e) => handleSnippetFileContextMenu(e, snippet.title)}
					>
					<SnippetItem fileData={snippet} />
					</div>
				))
				}
			</div>

			<div className="py-1 px-2">
				<p className="text-xs">{snippetCount} Total Snippet/s</p>
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
							<button onClick={handleShowRenameSnippetModal} className={Styles.snippetFileButton}>
								Rename Snippet
							</button>
							<button onClick={handleDeleteSnippet} className={Styles.snippetFileButton}>
								Delete Snippet
							</button>
						</>
					)}
					{menu.type === "foldersArea" && (
						<>
							<button onClick={handleShowNewFolderModal} className={Styles.snippetFileButton}>
								New Folder
							</button>
						</>
					)}
					{menu.type === "folder" && (
						<>
							<button onClick={handleShowRenameFolderModal} className={Styles.snippetFileButton}>
								Rename Folder
							</button>
							<button onClick={handleShowDeleteFolderModal} className={Styles.snippetFileButton}>
								Delete Folder
							</button>
						</>
					)}
					{menu.type === "snippetFilesArea" && (
						<>
							<button onClick={handleShowNewSnippetModal} className={Styles.snippetFileButton}>
								New Snippet
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