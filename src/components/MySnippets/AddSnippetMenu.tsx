interface AddSnippetMenuProps {
    onClose: () => void;    
};

const AddSnippetMenu: React.FC<AddSnippetMenuProps> = ({ onClose }) => {
    return (
        <div onClick={onClose} className="flex flex-col bg-white shadow-md px-12 py-14">
            {/* Close Button */}
            <button className="cursor-pointer">
                <img src="/close-icon.svg" className="size-6"/>
            </button>
        </div>
    );
};

export default AddSnippetMenu;