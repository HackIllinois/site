"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const search = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const to = search.get("to") ?? "/";

        localStorage.setItem("to", to);
        const authUrl = `https://adonix.hackillinois.org/auth/login/github/?redirect=${encodeURIComponent(window.location.origin)}/auth/`;
        router.push(authUrl);
    }, []);

    return <h2>Loading</h2>;
};

const Login = () => {
    return (
        <Suspense>
            <SignIn />
        </Suspense>
    );
};

export default Login;
