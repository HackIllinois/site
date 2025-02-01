"use client";

import Navbar from "@/components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { getRegistrationStatus } from "@/util/api";
import GlobalContext, { GlobalContextType } from "@/app/context";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [isRegistrationOpen, setIsRegistrationOpen] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);

    function getValue(): GlobalContextType {
        if (isLoading) {
            return { eventStatus: "loading" };
        }

        if (isRegistrationOpen) {
            return { eventStatus: "registration" };
        }

        return { eventStatus: "admission" };
    }

    useEffect(() => {
        getRegistrationStatus().then(({ alive }) => {
            setIsRegistrationOpen(alive);
            setIsLoading(false);
        });
    }, []);

    return (
        <GlobalContext.Provider value={getValue()}>
            <Navbar />
            {children}
        </GlobalContext.Provider>
    );
}
