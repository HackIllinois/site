"use client";

import { useEffect, useState } from "react";
import { GeneralRegistration } from "../general/page";
import { useRouter } from "next/navigation";
import PasswordAuthPage from "./PasswordAuthPage";
import { FORCE_REGISTRATION_CLOSED } from "../constants";

const LateGeneralRegistration = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (!FORCE_REGISTRATION_CLOSED) {
            router.push("/");
        }

        // Check localStorage for authentication
        const authenticated = localStorage.getItem(
            "lateRegistrationAuthenticated"
        );
        if (authenticated === "true") {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (!isAuthenticated) {
        return (
            <PasswordAuthPage
                onAuthenticated={() => {
                    localStorage.setItem(
                        "lateRegistrationAuthenticated",
                        "true"
                    );
                    setIsAuthenticated(true);
                }}
            />
        );
    }

    return <GeneralRegistration hardStatus={"open"} />;
};

export default LateGeneralRegistration;
