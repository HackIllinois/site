"use client";
import Loading from "@/components/Loading/Loading";
import {
    isAuthenticated,
    authenticate,
    getRegistrationOrDefault
} from "@/util/api";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import GlobalContext from "../context";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { eventStatus } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Skip auth checks for challenge page
        if (pathname.startsWith("/register/challenge")) {
            setIsLoading(false);
            return;
        }

        if (eventStatus === "loading") {
            return;
        }

        if (!isAuthenticated()) {
            authenticate(pathname);
            return;
        }

        getRegistrationOrDefault().then(registration => {
            if (registration.hasSubmitted) {
                router.push("/profile");
                return;
            }

            if (eventStatus !== "registration") {
                router.push("/closed");
                return;
            }

            setIsLoading(false);
        });
    }, [eventStatus, router, pathname]);

    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            {isLoading && <Loading />}
            {children}
        </>
    );
};

export default Layout;
