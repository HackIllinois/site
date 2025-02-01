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
        if (eventStatus === "loading") {
            return;
        }

        if (eventStatus === "registration") {
            setIsLoading(false);
            return;
        }

        if (!isAuthenticated()) {
            authenticate(pathname);
            return;
        }

        getRegistrationOrDefault().then(registration => {
            router.push(registration.hasSubmitted ? "/profile" : "/closed");
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
