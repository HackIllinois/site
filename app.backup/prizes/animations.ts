import { keyframes } from "@mui/system";
import { Variants } from "framer-motion";

export const bob = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
`;

export const twinkle = keyframes`
    0% {
        opacity: 0.15;
        filter: drop-shadow(0 0 3px rgba(255,255,255,0.3));
    }
    50% {
        opacity: 0.95;
        filter: drop-shadow(0 0 14px rgba(255,255,255,0.95));
    }
    100% {
        opacity: 0.15;
        filter: drop-shadow(0 0 3px rgba(255,255,255,0.3));
    }
`;

export const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
        }
    }
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    }
};
