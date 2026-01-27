import { isAuthenticated, loadSubmission, registrationAlive } from "@/util/api";
import { RegistrationApplicationSubmitted } from "@/util/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useRegistrationAuth = (shouldLoadSubmission: boolean = false) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [submission, setSubmission] =
        useState<RegistrationApplicationSubmitted | null>(null);

    const handleLoad = async () => {
        try {
            const alive = await registrationAlive();
            if (!alive) {
                router.push("/registration-closed");
                return;
            }
        } catch {
            alert(
                "Could not check if registration is still active; please try again later."
            );
            return;
        }

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
