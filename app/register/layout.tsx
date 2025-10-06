"use client";
import Loading from "@/components/Loading/Loading";
import {
    isAuthenticated,
    authenticate,
    getRegistrationOrDefault
} from "@/util/api";
import Head from "next/head";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

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
