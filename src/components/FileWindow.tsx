import React from "react";

interface FileWindowProps {
  title: string;
  language: string;
  content: string;
  updatedAt: Date;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const FileWindow: React.FC<FileWindowProps> = ({
  title,
  language,
  content,
  updatedAt,
  isOpen,
  onClose,
  className,
}) => {
  if (!isOpen) return null; // Only render when open

    // [HANDLE] Copy content
    const handleCopyContent = async () => {
        try {
            await navigator.clipboard.writeText(content);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div
        className={`fixed inset-0 bg-black/40 flex items-center justify-center ${className || ""}`}
        onClick={onClose}
        >
        <div
            className="bg-white rounded-2xl shadow-lg p-6 w-[600px] max-h-[80vh] overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-black">
                <img src="/close-icon.svg" className="size-6 cursor-pointer"/>
            </button>
            </div>

            <div className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Language:</span> {language}
            </div>

            <span className="flex justify-between bg-gray-100 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">
                {content}
                </pre>
                <button onClick={handleCopyContent}>
                    <img src="/copy-content-icon.svg" className="size-5 cursor-pointer"/>
                </button>
            </span>

            <div className="text-xs text-gray-400 mt-3">
            Last updated: {updatedAt.toLocaleString()}
            </div>
        </div>
        </div>
    );
};

export default FileWindow;
