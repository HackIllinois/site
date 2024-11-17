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
