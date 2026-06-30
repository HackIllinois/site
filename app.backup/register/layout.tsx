"use client";
import Head from "next/head";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Head>
                <title>HackIllinois | Register</title>
            </Head>
            {children}
        </>
    );
};

export default Layout;
