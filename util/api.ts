import {
    MethodType,
    RegistrationType,
    ProfileType,
    RSVPDecisionType,
    RSVPType,
    UserType,
    ProfileBodyType,
    WithId,
    FileType,
    RefreshTokenResType,
    EventType
} from "./types";

const APIv2 = "https://adonix.hackillinois.org";

export class APIError extends Error {
    status: number;
    type: string;

    constructor({
        message,
        status,
        type
    }: {
        message: string;
        status: number;
        type: string;
    }) {
        super(message);
        this.status = status;
        this.type = type;
        this.name = "APIError";
    }
}

export const isAuthenticated = (): string | null =>
    sessionStorage.getItem("token");

export function authenticate(to: string): void {
    if (process.env.NEXT_PUBLIC_REACT_APP_TOKEN) {
        sessionStorage.setItem(
            "token",
            process.env.NEXT_PUBLIC_REACT_APP_TOKEN
        );
    } else {
        localStorage.setItem("to", to);
        to = `${APIv2}/auth/login/github/?device=dev`;
    }
    window.location.replace(to);
}

async function requestv2(method: MethodType, endpoint: string, body?: unknown) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org",
            Authorization: sessionStorage.getItem("token") || ""
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw new APIError(await response.json());
    }

    return response.json();
}

export function getRegistration(): Promise<WithId<RegistrationType>> {
    return requestv2("GET", `/registration`).catch(() => null);
}

export function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return requestv2("POST", `/registration`, registration);
}
