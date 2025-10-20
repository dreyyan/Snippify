import { useRef, useEffect } from "react";
interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    type?: 'alert' | 'info' | 'confirm' | 'error' | 'prompt';
    title?: string;
    content?: string;
    children?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
};

const DialogBox: React.FC<DialogBoxProps> = ({ isOpen, onClose, type, title, content, children, size, className }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div ref={modalRef} className={`border-2 border-[rgba(23,32,38,0.1)] bg-[var(--background)] rounded-lg shadow-md p-6 ${size === 'sm' ? 'w-64' : size === 'lg' ? 'w-128' : 'w-96'} ${className}`}>
                <span className="flex gap-x-1"><img src={`${type}-icon.svg`}/>{title && <p className="text-xl font-bold mb-2">{title}</p>}</span>
                {children ? <div>{children}</div> : <p className="text-sm mb-4">{content}</p>}
                <button onClick={onClose} className="text-sm font-bold w-16 px-2 py-2 rounded-md text-[var(--text-on-primary)] bg-[var(--primary)] transition-colors duration-200 hover:bg-[#018ec2] cursor-pointer">Close</button>
            </div>
        </div>
    );
};

export default DialogBox;