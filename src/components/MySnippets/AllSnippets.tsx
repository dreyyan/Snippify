import { useState } from "react";
import Styles from "../../styles/Styles";
import SnippetFile from "./SnippetFile";

const AllSnippets = () => {
	const [selectedSnippet, setSelectedSnippet] = useState(1);
	const folders = [
		"C++", "Java", "JavaScript"
	];

	const testFiles = [
		"For Loop", "Arrow Function", "Constructor"
	];

	return (
	<div className={Styles.container}>
		{/* File Hierarchy */}
		<div className="border-r-2 border-[rgba(131,131,131,0.2)] flex flex-col shadow-md bg-[#ebebeb]">
		{folders.map((folder, index) => (
			<button onClick={() => setSelectedSnippet(index + 1)} className={`${Styles.folderShortcut} ${index === selectedSnippet - 1 && 'bg-white'}`}>{folder}</button>
		))}
		</div>

		{/* File Explorer */}
		<div className="col-span-4 shadow-md bg-[var(--background)]/80 flex flex-col items-center min-h-100">
			{/* Header */}
			<span className="w-full flex justify-between px-4 py-2 bg-white [&>p]:text-xs">
				<p>Name</p>
				<p>Language</p>
				<p>Date Modified</p>
			</span>

			<SnippetFile title="For Loop" language="C++" updatedAt={new Date()}/>
		</div>
	</div>
	);
};

export default AllSnippets;