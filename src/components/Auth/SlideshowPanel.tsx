import { useEffect, useState } from "react";
import Styles from "../../styles/Styles";
import FeatureCard from "../../components/HeroSection/FeatureCard";
import { motion, AnimatePresence } from "framer-motion";

const SlideshowPanel = () => {
    // States
    const [cardNumber, setCardNumber] = useState(1);

    // [HANDLE] Increment current card number
    const incrementCardNumber = () => {
        // Reset card number if reached max
        if (cardNumber === 4) setCardNumber(1);
        else setCardNumber(prev => prev + 1);
    };

    // [EFFECT] Timer for feature slideshow
    useEffect(() => {
        const timer = setTimeout(() => {
            incrementCardNumber(); // Increment card number every 5 seconds
        }, 5000);

        // Cleanup when component unmounts
        return () => clearTimeout(timer);
    }, [cardNumber]);

    const variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex items-center justify-center h-[90%]">
            <AnimatePresence mode="wait">
                {cardNumber === 1 && (
                <motion.div
                    key={1}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <FeatureCard
                    iconUrl="api-icon.svg"
                    title="Web & API-First"
                    description="Access snippets via web or REST API for seamless integration."
                    />
                </motion.div>
                )}

                {cardNumber === 2 && (
                <motion.div
                    key={2}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <FeatureCard
                    iconUrl="programming-language-icon.svg"
                    title="Targeted Developer Workflows"
                    description="Supports multiple languages with usage tips and examples."
                    />
                </motion.div>
                )}

                {cardNumber === 3 && (
                <motion.div
                    key={3}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <FeatureCard
                    iconUrl="collaboration-icon.svg"
                    title="Collaboration & Team Features"
                    description="Share, fork, and version snippets for team productivity."
                    />
                </motion.div>
                )}

                {cardNumber === 4 && (
                <motion.div
                    key={4}
                    variants={variants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <FeatureCard
                    iconUrl="flexible-integration-icon.svg"
                    title="Flexible Integration"
                    description="Export snippets in JSON or VS Code .code-snippets format."
                    />
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SlideshowPanel;