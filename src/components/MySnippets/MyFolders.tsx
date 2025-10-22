import { useState } from "react";
import Styles from "../../styles/Styles";
import SnippetFile from "./SnippetFile";
import AddSnippetMenu from "./AddSnippetMenu";

const MyFolders = () => {
	// States
	const [selectedSnippet, setSelectedSnippet] = useState(1);
	const [showAddSnippetMenu, setShowAddSnippetMenu] = useState(false);
	const [menu, setMenu] = useState<{ 
		visible: boolean; 
		x: number; 
		y: number; 
		type: "file" | "empty" | ""; 
		target?: string; 
	}>({
		visible: false,
		x: 0,
		y: 0,
		type: "",
	});

	const folders = [
		"C++", "Java", "JavaScript"
	];

	const testFiles = [
		"For Loop", "Arrow Function", "Constructor"
	];

	// [HANDLE] Toggle visibility of add snippet modal
	const toggleSnippetMenu = () => {
		setShowAddSnippetMenu(prev => !prev);
	};

	// [HANDLE] Add a folder in the file hierarchy
	const handleAddFolder = () => {
		
	};

	// [HANDLE] User right clicks file area
	const handleEmptyAreaContextMenu = (e: React.MouseEvent) => {
		e.preventDefault();
		setMenu({ visible: true, x: e.pageX, y: e.pageY, type: 'empty' });
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

	return (
	<div className={Styles.container}>
		{/* Modal - Add Snippet */}
		{showAddSnippetMenu ? (
			<div className="">
				<AddSnippetMenu onClose={toggleSnippetMenu}/>
			</div>
		) : ( // File Hierarchy
		<>
		<div className="col-span-2  border-[rgba(131,131,131,0.2)] flex flex-col shadow-md bg-[#ebebeb]">
			{/* Folder Operations */}
			{/* <div className="flex justify-end px-3 py-3 shadow-lg bg-[var(--primary)]"> */}
				{/* Add Folder */}
				{/* <button onClick={handleAddFolder} className="w-6 h-6">
					<img src="add-folder-icon.svg" className="rounded-full shadow-md p-1 bg-white hover:bg-[#FFFFFF]/80"/>
				</button>
			</div> */}

			{/* Folders */}
			{folders.map((folder, index) => (
				<button onClick={() => setSelectedSnippet(index + 1)} className={`${Styles.folderShortcut} ${index === selectedSnippet - 1 && 'bg-white shadow-sm'}`}>{folder}</button>
			))}
		</div>


		{/* File Explorer */}
		<div
		onClick={handleOutsideClick}
		onContextMenu={handleEmptyAreaContextMenu}
		className="border border-[rgba(90,90,90,0.2)] col-span-5 shadow-md bg-white flex flex-col items-center min-h-100">
			{/* Header */}
			<span className="w-full flex justify-between px-4 py-2 [&>p]:text-xs">
				<p>Name</p>
				<p>Language</p>
				<p>Date Modified</p>
			</span>

				{/* Snippet Files */}
				<div className="w-full">
					{testFiles.map((file) => (
						<div
							key={file}
							onContextMenu={(e) => handleSnippetFileContextMenu(e, file)}
						>
							<SnippetFile title={file} language="C++" updatedAt={new Date()} />
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
								<button onClick={() => alert("New Folder")} className={Styles.snippetFileButton}>
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