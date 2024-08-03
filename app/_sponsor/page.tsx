"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const Sponsor = () => {
    useEffect(() => {
        redirect("/documents/sponsorship.pdf");
    });

    return null;
};

export default Sponsor;
