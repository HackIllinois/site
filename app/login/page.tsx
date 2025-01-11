"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Login = () => {
    const search = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const to = search.get("to") ?? "/";

        localStorage.setItem("to", to);
        const authUrl = `https://adonix.hackillinois.org/auth/login/github/?redirect=${window.location.origin}/auth/`;
        router.push(authUrl);
    }, []);

    return <h2>Loading</h2>;
};

export default Login;
