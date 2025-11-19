import { handleError } from "./helpers";
import {
    ChallengeStatus,
    FileType,
    MethodType,
    RegistrationApplicationDraftBody,
    RegistrationType,
    WithId
} from "./types";

const APIv2 = "https://adonix.hackillinois.org";

export const isAuthenticated = async (): Promise<boolean> => {
    return (await getAuthToken()) !== null;
};

export async function getAuthToken(): Promise<string | null> {
    const response = await fetch(APIv2 + "/auth/token", {
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        }
    });
    if (response.ok) {
        const data = await response.json();
        console.log("Data", data);
        // localStorage.setItem("token", data.token);
        return data.jwt;
    }
    return null;
}

export function authenticate(): void {
    const authUrl = `${APIv2}/auth/login/github/?redirect=${window.location.origin}/register/general`;
    window.location.replace(authUrl);
}

// If status is good, returns response. If status is bad, throws the error response.
// Should handle errors with handleError.
// Make sure if something like "NotFound" is expected to handle it explicitly and not pass to handleError.
export async function requestv2(
    method: MethodType,
    endpoint: string,
    body?: unknown
) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        },
        body: JSON.stringify(body)
    });

    const responseJSON = await response.json();

    if (
        responseJSON.error === "TokenInvalid" ||
        responseJSON.error == "TokenExpired" ||
        responseJSON.error == "NoToken"
    ) {
        sessionStorage.removeItem("token");
        authenticate();
        return;
    }

    if (!response.ok) {
        throw responseJSON;
    }

    return responseJSON;
}

export async function getChallenge(): Promise<ChallengeStatus> {
    const res = await requestv2("GET", "/registration/challenge/").catch(body =>
        handleError(body)
    );
    return res;
}

export async function subscribe(
    listName: string,
    emailAddress: string
): Promise<string> {
    const res = await requestv2("POST", "/newsletter/subscribe/", {
        listName,
        emailAddress
    }).catch(body => handleError(body));
    return res;
}

export async function uploadFile(file: File, type: FileType): Promise<unknown> {
    const { url, fields } = await requestv2("GET", "/s3/upload");
    let data = new FormData();
    for (let key in fields) {
        data.append(key, fields[key]);
    }
    data.append("file", file, file.name);
    const res = await fetch(url, { method: "POST", body: data });

    if (!res.ok) {
        const errorBody = await res.text();
        handleError({
            message: errorBody,
            status: res.status,
            type: "upload_error"
        });
    }
    return res;
}

export async function saveDraft(data: RegistrationApplicationDraftBody) {
    return await requestv2("PUT", "/registration/draft", data);
}

export async function loadDraft() {
    return (await requestv2(
        "GET",
        "/registration/draft"
    )) as RegistrationApplicationDraftBody & {
        userId: string;
    };
}

export async function submitDraft() {
    return await requestv2("POST", "/registration/submit");
}

export async function loadSubmission() {
    return await requestv2("GET", "/registration");
}
