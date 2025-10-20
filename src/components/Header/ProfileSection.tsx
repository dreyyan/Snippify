import { useState, useRef, useEffect } from "react";
import Styles from "../../styles/Styles";
import { useNavigate } from "react-router-dom";

const ProfileSection = ({ onLogout }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // [HANDLE] Toggle dropdown
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // [HANDLE] Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const handleGoToProfile = () => { setIsOpen(false); navigate("/my-profile"); }
    const handleGoToSettings = () => { setIsOpen(false); navigate("/settings"); }

    const handleLogout = () => {
        setIsOpen(false);
        if (onLogout) onLogout(); // call parent handler
        navigate("/login");
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Dropdown Trigger */}
            <button onClick={toggleDropdown} className="flex items-center gap-x-1 cursor-pointer">
                <img src="/user-profile.svg" alt="User" />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-14 right-0 mt-2 py-1 w-48 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-10 [&>button]:cursor-pointer">
                    <button
                        onClick={handleGoToProfile}
                        className="w-full text-left px-4 py-2 hover:bg-[var(--background)] flex items-center gap-x-2"
                    >
                        <img src="profile-icon.svg" className="size-5" alt="" /> Profile
                    </button>
                    <button
                        onClick={handleGoToSettings}
                        className="w-full text-left px-4 py-2 hover:bg-[var(--background)] flex items-center gap-x-2"
                    >
                        <img src="settings-icon.svg" className="size-5" alt="" /> Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-[var(--background)] flex items-center gap-x-2 text-red-600"
                    >
                        <img src="logout-icon.svg" className="size-5" alt="" /> Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileSection;