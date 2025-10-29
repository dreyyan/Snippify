import { useRef, useEffect } from "react";
import Styles from "../styles/Styles";

type BaseModalProps = {
  isOpen?: boolean;
  onClose?: (() => void) | null;
  title?: string;
  content?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

type PromptModalProps = BaseModalProps & {
  type: 'prompt';
  onConfirm?: () => void;
};

type InfoModalProps = BaseModalProps & {
  type: 'info' | 'alert' | 'confirm' | 'error';
  onConfirm?: never;
};

type ModalProps = PromptModalProps | InfoModalProps;

const Modal: React.FC<ModalProps> = ({ isOpen = true, onClose, type, onConfirm, title, content, children, size, className }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    // [EFFECT: Close Modal] When user clicks outside the modal 
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose?.();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    // [EFFECT: Close Modal] When user presses 'escape' key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose?.();
        };
        if (isOpen) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Render nothing when modal is closed
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1px] bg-black/40">
            <div ref={modalRef} className={`border-2 border-[rgba(23,32,38,0.1)] bg-[var(--background)] rounded-lg shadow-md space-y-4 p-6  ${size === 'sm' ? 'w-70' : size === 'lg' ? 'w-128' : 'w-96'} ${className}`}>
                {/* Header */}
                <span className="flex justify-between items-center gap-x-2 mb-3">
                    <div className="flex gap-x-2">
                        <img src={`${type}-icon.svg`} className="size-6"/>
                        {title && <p className="text-lg font-bold">{title}</p>}
                    </div>
                    {type !== 'prompt' &&
                    <button onClick={onClose!} className="text-gray-500 hover:text-black">
                        <img src="/close-icon.svg" className="size-6 cursor-pointer"/>
                    </button>
                    }
                </span>

                {/* Children Props */}
                {children ? <div>{children}</div> : <p className="text-sm mb-4">{content}</p>}
                
                {/* Buttons */}
            </div>
        </div>
    );
};

export default Modal;
export type { ModalProps };