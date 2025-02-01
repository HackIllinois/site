"use client";
import { createContext } from "react";

export type GlobalContextType = {
    eventStatus:
        | "registration"
        | "admission"
        | "event"
        | "postevent"
        | "loading";
};

const GlobalContext = createContext<GlobalContextType>({
    eventStatus: "loading"
});

export default GlobalContext;
