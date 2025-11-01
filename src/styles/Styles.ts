const Styles = {
    // Header
    headerContainer: "flex justify-between items-center shadow-md px-6 py-4 bg-[#FFFFFF] sticky top-0 z-10",
    headerLink: "text-sm roboto-medium text-[var(--text-primary)] relative transition ease-out before:content-[''] before:absolute before:left-1/2 before:bottom-[-2px] before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-[var(--text-primary)]/80 before:transition-all before:duration-300 hover:before:w-full",

    // Footer
    footerContainer: "fixed bottom-0 flex flex-col justify-center items-center w-full px-6 py-4 shadow-md bg-[#FFFFFF] z-10",
    footerLink: "text-sm roboto-regular text-[#668896] transition-colors duration-300 hover:text-[#7ea2b1]",
    
    // Buttons
    primaryButton: "text-sm font-bold w-full px-4 py-2 rounded-full text-[var(--text-on-primary)] bg-[var(--primary)] transition-colors duration-200 hover:bg-[oklch(55%_0.163_235.38)] cursor-pointer",
    primaryModalButton: "text-xs font-bold w-16 px-2 py-2 rounded-full text-[var(--text-on-primary)] bg-[var(--primary)] transition-colors duration-200 hover:bg-[#018ec2] cursor-pointer",
    secondaryButton: "group text-[var(--text-secondary)] text-xs flex justify-center items-center gap-x-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:text-[var(--text-primary)]",
    oAuthButton: "group border text-[var(--text-secondary)] border-[var(--secondary)] text-xs flex justify-center items-center gap-x-2 w-full px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:text-[var(--background)] hover:bg-[var(--secondary)] hover:border-[var(--secondary)] [&>p]:hover:text-[var(--background)]",

    // Form
    authHeader: "bbh-sans-hegarty-light text-[var(--secondary)]",
    authQuote: "text-[0.9rem] text-[var(--text-secondary)]",
    formInput: "border-1 border-[rgba(90,90,90,0.2)] shadow-sm rounded-sm text-sm mt-1 px-3 py-2 focus:outline-none focus:ring-0",
    inputLabel: "text-[0.825rem] font-semibold",
    field: "flex flex-col relative",
    visibilityIcon: "size-5 mt-1",

    // Auth
    signUpPanel: "flex flex-1 justify-center items-center w-full px-60 bg-[linear-gradient(to_bottom,var(--primary),var(--secondary))] overflow-hidden",
    loginPanel: "w-1/2 px-20 pt-2 bg-[var(--background)]",

    // Text
    textLink: "text-xs text-[var(--secondary)] transition-all duration-300 hover:text-[var(--text-secondary)] cursor-pointer",

    // My Snippets
    tabsContainer: "flex gap-x-2",
    tabActiveButton: "text-xs font-bold px-4 py-2 rounded-t-md text-[var(--text-primary)] bg-white transition-colors duration-200 cursor-pointer",
    tabButton: "flex items-center gap-x-2 text-sm font-bold px-4 py-2 rounded-t-md text-[var(--text-primary)] bg-[var(--background)] transition-colors duration-200 cursor-pointer",
    folderShortcut: "flex justify-between items-center text-xs text-left px-4 font-bold text-[var(--background)] py-2 cursor-pointer",
    snippetItem: "grid grid-cols-3 px-4 py-2 text-sm w-full border-b border-[rgba(90,90,90,0.2)] shadow-sm bg-[#FFFFFF] hover:bg-[#E6F6FB] cursor-pointer",
    folderItem: "flex justify-between px-4 py-1 w-full text-sm border-b border-[rgba(90,90,90,0.2)] hover:border-t-red-500 cursor-pointer",
    snippetFileButton: "text-start text-xs w-full px-2 py-1 hover:bg-[rgba(90,90,90,0.1)] cursor-pointer",

    // MyFolders
    searchbarInput: "w-[86%] px-3 py-2 text-xs focus:outline-none focus:ring-0",

    // Header
    navigationLink: "w-full text-sm text-right px-4 py-2 hover:bg-[var(--background)] flex items-end gap-x-2",
};

export default Styles;