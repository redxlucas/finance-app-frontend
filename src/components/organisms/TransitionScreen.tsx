import { motion } from "framer-motion";
import { TurtleIcon } from "lucide-react";

interface TransitionScreenProps {
    type: "loading" | "splash";
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({ type }) => {
    return (
        <motion.div
            key={type}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                type === "loading"
                    ? "bg-background"
                    : "bg-secondary text-primary"
            }`}
        >
            {type === "loading" ? (
                <div className="flex flex-col items-center space-y-4">
                    <div
                        className="w-16 h-16 rounded-full border-4 border-dashed animate-spin"
                        style={{
                            borderColor: "var(--color-primary)",
                            borderTopColor: "transparent",
                        }}
                    />
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <TurtleIcon className="w-12 h-12 animate-pop" />
                    <h1 className="text-4xl select-none animate-pop">Jabuti</h1>
                </div>
            )}
        </motion.div>
    );
};
