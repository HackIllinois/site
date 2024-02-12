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

const API = "https://api.hackillinois.org";
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

async function requestv2(method: MethodType, endpoint: string, body?: unknown) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        },
        body: JSON.stringify(body)
    });

    if (response.status !== 200) {
        throw new APIError(await response.json());
    }

    return response.json();
}

export function subscribe(
    listName: string,
    subscriber: string
): Promise<string> {
    return requestv2("POST", "/newsletter/subscribe/", {
        listName: listName,
        emailAddress: subscriber
    });
}

async function request(method: MethodType, endpoint: string, body?: unknown) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        headers: {
            Authorization: sessionStorage.getItem("token") || "",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (response.status === 403) {
        alert("Your session has expired. Please close this tab and log in again.");
        sessionStorage.removeItem("token");
    }

    if (response.status !== 200) {
        throw new APIError(await response.json());
    }

    return response.json();
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
        to = `${APIv2}/auth/login/github/?device=web`;
    }
    window.location.replace(to);
}

export function getToken(code: string): Promise<string> {
    return request("POST", "/auth/code/github/", { code }).then(
        res => res.token
    );
}

export function getRoles(): Promise<string[]> {
    return request("GET", "/auth/roles/").then(res => res.roles);
}

export function getRolesSync(): string[] {
    const token = sessionStorage.getItem("token");
    if (token) {
        try {
            const tokenData = JSON.parse(atob(token.split(".")[1]));
            return tokenData.roles;
        } catch (e) {
            // if the token is incorrectly formatted, we just ignore it and return the default []
        }
    }
    return [];
}

export function getRegistration(): Promise<WithId<RegistrationType>> {
    return request("GET", `/registration`).catch(() => null);
}

export async function getChallenge(): Promise<boolean> {
    const response = await fetch("https://artemis.hackillinois.org/status", {
        method: "GET",
        headers: {
            Authorization: sessionStorage.getItem("token") || "",
            "Content-Type": "application/json"
        }
    });

    if (response.status !== 200) {
        throw new APIError(await response.json());
    }

    const ret = await response.json().then(json => json.status);
    return ret;
}

// this function does not have a return type because different roles have different response types
export function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return request("POST", `/registration`, registration);
}

export function register(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return request("POST", `/registration/submit`, registration);
}

export function uploadFile(file: File, type: FileType): Promise<unknown> {
    return request("GET", "/s3/upload/")
        .then((res) => {return {url: res.url, fields: res.fields}}).then(({url, fields}) => {
            let data = new FormData();
            for (let key in fields) {
                data.append(key, fields[key]);
            }
            data.append("file", file, file.name);
            return fetch(url, {
                method: "POST",
                // headers: { "Content-Type": "multipart/form-data" },
                body: data
            }).then(res => {
                if (res.ok) {
                    return res;
                }
                throw new Error("response did not have status 200");
            });                 //.catch(err => console.log(err));
        });
}

export function isRegistered(): Promise<any> {
    return request("GET", "/admission/rsvp").catch(() => null);
}

export function refreshToken(): Promise<void> {
    return request("GET", "/auth/token/refresh/").then(
        (res: RefreshTokenResType) => sessionStorage.setItem("token", res.token)
    );
}

export function getProfile(): Promise<ProfileType> {
    return request("GET", "/profile").catch(() => null);
}

export function setProfile(body: ProfileBodyType): Promise<ProfileType> {
    return request("POST", "/profile", body);
}

export function getUser(): Promise<UserType> {
    return request("GET", "/user");
}

export function getRSVP(): Promise<RSVPType> {
    return request("GET", "/admission/rsvp");
}

export function rsvpAccept(): Promise<RSVPDecisionType> {
    return request("PUT", "/admission/rsvp/accept");
}

export function rsvpDecline(): Promise<RSVPDecisionType> {
    return request("PUT", "/admission/rsvp/decline");
}

export function getEvents(): Promise<EventType[]> {
    return requestv2("GET", "/event").then((res) => res.events);
}