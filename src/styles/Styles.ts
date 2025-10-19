const Styles = {
    // Header
    headerContainer: "flex justify-between items-center px-6 py-4 sticky top-0 z-10",
    headerLink: "text-sm roboto-medium text-[var(--text-primary)] relative transition ease-out before:content-[''] before:absolute before:left-1/2 before:bottom-[-2px] before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-[var(--text-primary)]/80 before:transition-all before:duration-300 hover:before:w-full",

    // Footer
    footerContainer: "fixed bottom-0 flex flex-col justify-center items-center w-full px-6 py-4 shadow-md bg-[#FFFFFF] z-10",
    footerLink: "text-sm roboto-regular text-[#668896] transition-colors duration-300 hover:text-[#7ea2b1]",
    
    // Buttons
    primaryButton: "text-sm font-bold w-full px-4 py-2 rounded-full text-[var(--text-on-primary)] bg-gradient-to-r from-[var(--primary)] to-[#0ebbfa] transition-colors duration-200 hover:bg-[#0081AF]",
    secondaryButton: "group border border-[var(--secondary)] flex justify-center items-center gap-x-2 text-[var(--text-primary)] w-full px-3 py-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-[var(--primary)] hover:border-[var(--background)] [&>p]:hover:text-[var(--background)]",

    // Form
    formInput: "border-1 border-[rgba(90,90,90,0.2)] shadow-sm rounded-sm text-sm mt-1 mb-4 px-3 py-2 focus:outline-none focus:ring-0",
    inputLabel: "text-[12px] font-semibold",
};

export default Styles;