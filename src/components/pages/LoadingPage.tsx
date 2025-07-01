import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TransitionScreen } from "../organisms/TransitionScreen";

type LoadingPageProps = {
    loading: boolean;
    children: React.ReactNode;
    splashDuration?: number;
    loadingDuration?: number;
    storageKey?: string;
};

export function LoadingPage({
    loading,
    children,
    splashDuration = 2000,
    loadingDuration = 3000,
    storageKey = "hasSeenSplash",
}: LoadingPageProps) {
    const [showLoading, setShowLoading] = useState(false);
    const [showSplash, setShowSplash] = useState(false);
    const [ready, setReady] = useState(false);
    const [hasAlreadyShown, setHasAlreadyShown] = useState<boolean | null>(
        null
    );

    useEffect(() => {
        const seen = sessionStorage.getItem(storageKey);
        setHasAlreadyShown(!!seen);
    }, [storageKey]);

    useEffect(() => {
        if (!loading && hasAlreadyShown !== null) {
            if (!hasAlreadyShown) {
                sessionStorage.setItem(storageKey, "true");
                setShowLoading(true);

                const loadingTimer = setTimeout(() => {
                    setShowLoading(false);
                    setShowSplash(true);

                    const splashTimer = setTimeout(() => {
                        setShowSplash(false);
                        setReady(true);
                    }, splashDuration);

                    return () => clearTimeout(splashTimer);
                }, loadingDuration);

                return () => clearTimeout(loadingTimer);
            } else {
                setReady(true);
            }
        }
    }, [loading, hasAlreadyShown, splashDuration, loadingDuration, storageKey]);

    return (
        <>
            <AnimatePresence>
                {showLoading && <TransitionScreen type="loading" />}
                {!showLoading && showSplash && (
                    <TransitionScreen type="splash" />
                )}
            </AnimatePresence>

            {ready && children}
        </>
    );
}
