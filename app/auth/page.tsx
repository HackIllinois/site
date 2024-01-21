"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Auth = () => {
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

export default Auth;
