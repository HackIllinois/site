"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const SignIn = () => {
    const search = useSearchParams();

    useEffect(() => {
        const token = search.get("token");

        // these are set in `authenticate` in util/api
        const { to: redirectTo } = localStorage;

        if (token) {
            signIn("credentials", { token, redirectTo });
        }
    }, []);

    return <h2>Loading</h2>;
};

const Auth = () => {
    return (
        <Suspense>
            <SignIn />
        </Suspense>
    );
};

export default Auth;
