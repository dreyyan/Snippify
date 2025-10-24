import { useRef, useEffect } from "react";
import Styles from "../styles/Styles";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

type PromptModalProps = BaseModalProps & {
  type: 'prompt';
  onConfirm: () => void;
};

type OtherModalProps = BaseModalProps & {
  type?: Exclude<'prompt', 'alert' | 'info' | 'confirm' | 'error'>;
  onConfirm?: never;
};

type ModalProps = PromptModalProps | OtherModalProps;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, type, onConfirm, title, content, children, size, className }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    // [EFFECT: Close Modal] When user clicks outside the modal 
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

    // [EFFECT: Close Modal] When user presses 'escape' key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Render nothing when modal is closed
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div ref={modalRef} className={`border-2 border-[rgba(23,32,38,0.1)] bg-[var(--background)] rounded-lg shadow-md space-y-4 p-6 ${size === 'sm' ? 'w-64' : size === 'lg' ? 'w-128' : 'w-96'} ${className}`}>
                <span className="flex items-center gap-x-1 mb-2"><img src={`${type}-icon.svg`} className="size-8"/>{title && <p className="text-xl font-bold">{title}</p>}</span>
                {children ? <div>{children}</div> : <p className="text-sm mb-4">{content}</p>}
                
                {/* Buttons */}
                {type !== 'prompt' &&
                <div className="flex justify-end gap-x-4">
                    <button onClick={onClose} className={Styles.secondaryButton}>Close</button>
                    <button onClick={onConfirm} className={Styles.primaryModalButton}>Create</button>
                </div>
                }
            </div>
        </div>
    );
};

export default Modal;