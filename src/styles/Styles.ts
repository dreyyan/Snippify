const Styles = {
    // Header
    headerContainer: "flex justify-between items-center px-6 py-4 sticky top-0 z-10",
    headerLink: "text-sm roboto-medium text-[var(--text-primary)] relative transition ease-out before:content-[''] before:absolute before:left-1/2 before:bottom-[-2px] before:-translate-x-1/2 before:w-0 before:h-[2px] before:bg-[var(--text-primary)]/80 before:transition-all before:duration-300 hover:before:w-full",

    // Footer
    footerContainer: "fixed bottom-0 flex flex-col justify-center items-center w-full px-6 py-4 shadow-md bg-[#FFFFFF] z-10",
    footerLink: "text-sm roboto-regular text-[#668896] transition-colors duration-300 hover:text-[#7ea2b1]",
    
    // Buttons
    primaryButton: "text-sm font-bold px-4 py-2 rounded-full text-[var(--text-on-primary)] bg-[var(--primary)] transition-colors duration-200 hover:bg-[#0081AF]",
    secondaryButton: ""
};

export default Styles;