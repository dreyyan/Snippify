const Divider = () => {
    return (
        <div className="flex items-center space-x-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <p className="text-[10px] text-[var(--text-secondary)]">OR</p>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    );
};

export default Divider;