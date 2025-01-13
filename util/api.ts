import {
    MethodType,
    RegistrationType,
    WithId,
    RSVPType,
    ChallengeStatus,
    FileType
} from "./types";
import { APIError } from "./error";
import { handleError } from "./helpers";

const APIv2 = "https://adonix.hackillinois.org";

export const isAuthenticated = (): string | null =>
    localStorage.getItem("token");

export function authenticate(to: string): void {
    localStorage.setItem("to", to);
    const authUrl = `${APIv2}/auth/login/github/?redirect=${window.location.origin}/auth/`;
    window.location.replace(authUrl);
}

export async function requestv2(
    method: MethodType,
    endpoint: string,
    body?: unknown
) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org",
            Authorization: localStorage.getItem("token") || ""
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
        authenticate(window.location.href);
        return;
    }

    if (!response.ok) {
        throw new APIError(responseJSON);
    }
    return responseJSON;
}

export async function getChallenge(): Promise<ChallengeStatus> {
    const res = await requestv2("GET", "/registration/challenge/").catch(body =>
        handleError(body)
    );
    return res;
}

export async function getRegistration(): Promise<WithId<RegistrationType>> {
    const res = await requestv2("GET", `/registration`).catch(body =>
        handleError(body)
    );
    return res;
}

export async function getRegistrationOrDefault(): Promise<
    WithId<RegistrationType> | RegistrationType
> {
    try {
        const response = await requestv2("GET", "/registration");
        return response;
    } catch (error: any) {
        if (error.error !== "NotFound") {
            handleError(error);
        }

        return {
            legalName: "",
            preferredName: "",
            gender: "",
            race: [],
            emailAddress: "",
            location: "",
            degree: "",
            university: "",
            gradYear: 0,
            major: "",
            minor: "",
            hackEssay1: "",
            hackEssay2: "",
            optionalEssay: "",
            considerForGeneral: false,
            proEssay: "",
            hackOutreach: [],
            hackInterest: [],
            dietaryRestrictions: [],
            requestedTravelReimbursement: false
        };
    }
}

export async function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    const res = await requestv2("POST", `/registration`, registration).catch(
        body => handleError(body)
    );
    return res;
}

export async function registerSubmit(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    const res = await requestv2(
        "POST",
        `/registration/submit`,
        registration
    ).catch(body => handleError(body));
    return res;
}

export async function getRSVP(): Promise<RSVPType> {
    const res = await requestv2("GET", "/admission/rsvp").catch(body =>
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
