"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signoutHandler } from "@/util/auth";

const SignOut = () => {
    const search = useSearchParams();

    useEffect(() => {
        const to = search.get("to") ?? "/";

        signoutHandler(to);
    }, [search]);

    return <h2>Loading</h2>;
};

const Logout = () => {
    return (
        <Suspense>
            <SignOut />
        </Suspense>
    );
};

export default Logout;
