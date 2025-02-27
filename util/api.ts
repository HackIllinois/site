import {
    MethodType,
    RegistrationType,
    WithId,
    RSVPType,
    ChallengeStatus,
    ProfileBodyType,
    ProfileType,
    EventType,
    AuthRoles
} from "./types";
import { handleError } from "./helpers";

const APIv2 = "https://adonix.hackillinois.org";

export const isAuthenticated = (): string | null =>
    localStorage.getItem("token");

export function authenticate(to: string): void {
    localStorage.setItem("to", to);
    const authUrl = `${APIv2}/auth/login/github/?redirect=${window.location.origin}/auth/`;
    window.location.replace(authUrl);
}

export function logOut() {
    localStorage.removeItem("token");
    window.location.replace("/");
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
        throw responseJSON;
    }

    return responseJSON;
}

export async function getChallenge(): Promise<ChallengeStatus> {
    const res = await requestv2("GET", "/registration/challenge/").catch(
        handleError
    );
    return res;
}

export async function getRegistrationOrDefault(): Promise<
    WithId<RegistrationType> | RegistrationType
> {
    try {
        const response = await requestv2("GET", "/registration");
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        handleError
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
    ).catch(handleError);
    return res;
}

export async function getRegistrationStatus(): Promise<{ alive: boolean }> {
    const res = await requestv2("GET", "/registration/status").catch(
        handleError
    );
    return res;
}

export async function getRSVP(): Promise<RSVPType> {
    const res = await requestv2("GET", "/admission/rsvp").catch(handleError);
    return res;
}

export async function getProfile(): Promise<ProfileType> {
    const res = await requestv2("GET", "/profile").catch(handleError);
    return res;
}

export async function getEvents(): Promise<EventType[]> {
    const res = await requestv2("GET", "/event").catch(handleError);
    return res.events as EventType[];
}

export async function RSVPDecideAccept() {
    const res = await requestv2("PUT", "/admission/rsvp/accept").catch(
        handleError
    );
    return res;
}

export async function refreshToken() {
    const res = await requestv2("GET", "/auth/token/refresh/").catch(
        handleError
    );
    localStorage.setItem("token", res.token);
}

export async function RSVPDecideDecline() {
    const res = await requestv2("PUT", "/admission/rsvp/decline").catch(
        handleError
    );
    return res;
}

export async function uploadFile(file: File): Promise<unknown> {
    const { url, fields } = await requestv2("GET", "/resume/upload");
    const data = new FormData();
    for (const key in fields) {
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

export async function unsubscribe(listName: string, emailAddress: string) {
    const res = await requestv2("DELETE", "/newsletter/subscribe/", {
        listName,
        emailAddress
    }).catch(handleError);
    return res;
}

export async function getQRCode(): Promise<string> {
    const res = await requestv2("GET", "/user/qr").catch(handleError);
    return res.qrInfo;
}

export function setProfile(body: ProfileBodyType): Promise<ProfileType> {
    return requestv2("POST", "/profile", body).catch(handleError);
}

export function updateProfile(
    body: Partial<ProfileBodyType>
): Promise<ProfileType> {
    return requestv2("PUT", "/profile", body).catch(handleError);
}

export function getAuthRoles(): Promise<AuthRoles> {
    return requestv2("GET", "/auth/roles").catch(handleError);
}
