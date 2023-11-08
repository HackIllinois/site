import { MethodType } from "./types";

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