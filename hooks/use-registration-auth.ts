import { isAuthenticated, loadSubmission } from "@/util/api";
import { RegistrationApplicationSubmitted } from "@/util/types";
import { useEffect, useState } from "react";

export const useRegistrationAuth = (shouldLoadSubmission: boolean = false) => {
    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [submission, setSubmission] =
        useState<RegistrationApplicationSubmitted | null>(null);

    const handleLoad = async () => {
        const isAuthenticatedResult = await isAuthenticated();
        if (!isAuthenticatedResult) {
            setIsLoading(false);
            setAuthenticated(false);
            return;
        }
        setAuthenticated(true);

        try {
            if (shouldLoadSubmission) {
                const submissionData = await loadSubmission();
                setSubmission(submissionData);
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        handleLoad();
    }, []);

    return {
        isLoading,
        authenticated,
        submission
    };
};
