// [IMPORT] Styles
import "../styles/index.css";

// [IMPORT] Components
import Header from "../components/Header/Header";
import FeatureCard from "../components/HeroSection/FeatureCard";
import Footer from "../components/Footer/Footer";

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="flex flex-1 flex-col gap-y-12 py-10">
                {/* Header Text */}
                <div className="px-[20%] space-y-4 [&_:where(b)]:text-[var(--primary)] [&_:where(b)]:font-semibold [&_:where(b)]:text-shadow-lg [&_:where(b)]:text-shadow-[rgba(0,129,175,0.1)]">
                    <h1 className="text-center text-[var(--text-primary)]"><b>Snip</b> it, <b>Ship</b> it.</h1>
                    <p className="text-sm text-center text-[var(--text-secondary)]">
                        Organize, search, and share code snippets in intuitive file hierarchies—starting with programming languages and customizable user folders.
                    </p>
                </div>
                
                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-y-10 w-full px-40">
                    <FeatureCard iconUrl="api-icon.svg" title="Web & API-First" description="Access snippets via web or REST API for seamless integration."/>
                    <FeatureCard iconUrl="programming-language-icon.svg" title="Targeted Developer Workflows" description="Supports multiple languages with usage tips and examples."/>
                    <FeatureCard iconUrl="collaboration-icon.svg" title="Collaboration & Team Features" description="Share, fork, and version snippets for team productivity."/>
                    <FeatureCard iconUrl="flexible-integration-icon.svg" title="Flexible Integration" description="Export snippets in JSON or VS Code .code-snippets format."/>
                </div>
            </div>
            {/* Footer */}
            <Footer/>
        </>
  );
};

export default Home;