"use client";
import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Search = () => {
    const search = useSearchParams();

    useEffect(() => {
        const token = search.get("token");

        // these are set in `authenticate` in util/api
        const { to } = localStorage;

        if (token) {
            sessionStorage.setItem("token", token);
            localStorage.removeItem("to");

            if (to) {
                window.location.replace(to);
            } else {
                window.location.replace(window.location.origin);
            }
        }
    });

    return <h2>Loading</h2>;
};

const Auth = () => {
    return (
        <Suspense>
            <Search />
        </Suspense>
    );
};

export default Auth;
