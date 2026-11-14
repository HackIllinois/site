import { API_BASE_URL } from "./api-config";
import { handleError } from "./helpers";
import {
    AcceptAdmissionRSVPRequest,
    AttendeeProfile,
    ChallengeResponse,
    ChallengeStatus,
    DevLoginRequest,
    DevLoginResponse,
    DevUsersResponse,
    MethodType,
    RegistrationApplicationDraftBody,
    RegistrationApplicationSubmitted,
    RSVPInfo,
    EventType,
    MentorProfile,
    JudgeProfile,
    JobPosting,
    UserInfo
} from "./types";

export const isAuthenticated = async (): Promise<boolean> => {
    return (await getAuthToken()) !== null;
};

export async function getAuthToken(): Promise<string | null> {
    const response = await fetch(API_BASE_URL + "/auth/token", {
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data.jwt;
    }
    return null;
}

export type AuthProvider = "github" | "google";

const AUTH_PROVIDER_KEY = "authProvider";

function isAuthProvider(value: string | null): value is AuthProvider {
    return value === "github" || value === "google";
}

export function getStoredAuthProvider(): AuthProvider {
    const stored = sessionStorage.getItem(AUTH_PROVIDER_KEY);
    return isAuthProvider(stored) ? stored : "github";
}

export function authenticate(provider: AuthProvider = "github"): void {
    sessionStorage.setItem(AUTH_PROVIDER_KEY, provider);

    const callbackUrl = `${window.location.origin}${window.location.pathname}`;

    const authUrl = `${API_BASE_URL}/auth/login/${provider}/?redirect=${encodeURIComponent(callbackUrl)}`;
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
    const response = await fetch(API_BASE_URL + endpoint, {
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
        authenticate(getStoredAuthProvider());
        throw responseJSON;
    }

    if (!response.ok) {
        throw responseJSON;
    }

    return responseJSON;
}

export async function loadChallengeStatus(): Promise<ChallengeStatus> {
    return await requestv2("GET", "/registration/challenge/");
}

// Downloads the applicant's assigned Saloon Rush floor plan as world.json.
export async function downloadChallengeWorld(): Promise<void> {
    const response = await fetch(
        API_BASE_URL + "/registration/challenge/world/",
        {
            method: "GET",
            mode: "cors",
            credentials: "include"
        }
    );
    if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw (
            body ?? {
                error: "DownloadFailed",
                message: "Couldn't download your floor plan."
            }
        );
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "world.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

export async function submitChallenge(file: File): Promise<ChallengeResponse> {
    const form = new FormData();
    form.append("solution", file);

    const response = await fetch(API_BASE_URL + "/registration/challenge/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: form
    });

    const responseJSON = await response.json().catch(() => ({
        error: "UnknownError",
        message: `The server responded with ${response.status}.`
    }));

    if (
        responseJSON.error === "TokenInvalid" ||
        responseJSON.error == "TokenExpired" ||
        responseJSON.error == "NoToken"
    ) {
        sessionStorage.removeItem("token");
        authenticate(getStoredAuthProvider());
        throw responseJSON;
    }

    return { status: response.status, body: responseJSON };
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

export async function submitDraft(body: RegistrationApplicationDraftBody) {
    return await requestv2("POST", "/registration/submit", body);
}

export async function loadSubmission(): Promise<RegistrationApplicationSubmitted> {
    return await requestv2("GET", "/registration");
}

export async function loadProfile(): Promise<AttendeeProfile> {
    return await requestv2("GET", "/profile");
}

export async function updateProfile(
    body: Partial<AcceptAdmissionRSVPRequest>
): Promise<AttendeeProfile> {
    return await requestv2("PUT", "/profile", body);
}

export async function loadAdmissionRSVP(): Promise<RSVPInfo> {
    return await requestv2("GET", "/admission/rsvp/");
}

export async function declineAdmissionRSVP(): Promise<void> {
    return await requestv2("PUT", "/admission/decline/");
}

export async function acceptAdmissionRSVP(
    body: AcceptAdmissionRSVPRequest
): Promise<RSVPInfo> {
    return await requestv2("PUT", "/admission/accept/", body);
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

export async function registrationAlive(): Promise<boolean> {
    const response = (await requestv2(
        "GET",
        "/registration/status/"
    )) satisfies { alive: boolean };
    return response.alive;
}

export async function postAuthRefresh(): Promise<void> {
    await requestv2("POST", "/auth/refresh", {});
}

export async function webSignOutUser(): Promise<void> {
    await requestv2("POST", "/auth/logout", {});
}

export async function getEvents(): Promise<EventType[]> {
    const res = await requestv2("GET", "/event").catch(handleError);
    return res.events as EventType[];
}

export async function loadQRCode(): Promise<{
    userId: string;
    qrInfo: string;
}> {
    return await requestv2("GET", "/user/qr/");
}

export async function getMentors(): Promise<MentorProfile[]> {
    const res = await requestv2("GET", "/mentor/info/").catch(handleError);
    return res as MentorProfile[];
}

export async function getJudges(): Promise<JudgeProfile[]> {
    const res = await requestv2("GET", "/judge/info/").catch(handleError);
    return res as JudgeProfile[];
}

export async function getUserInfo(): Promise<UserInfo> {
    const res = await requestv2("GET", "/user").catch(handleError);
    return res as UserInfo;
}

async function requestDevApi<T>(
    method: "GET" | "POST",
    endpoint: string,
    body?: unknown
): Promise<T> {
    const response = await fetch(API_BASE_URL + endpoint, {
        method,
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        },
        body: body === undefined ? undefined : JSON.stringify(body)
    });

    const responseBody = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message =
            responseBody.message ||
            responseBody.error ||
            `Request failed with status ${response.status}`;
        throw new Error(message);
    }

    return responseBody as T;
}

export async function getDevUsers(): Promise<DevUsersResponse> {
    return requestDevApi("GET", "/dev/users/");
}

/**
 * Local-only login. Prefer Adonix `POST /dev/login/` (adonix#382). If that route
 * is missing, fall back to main's `POST /dev/seed/fresh-user/` +
 * `GET /auth/dev/login/:userId/` so local test-user pills work either way.
 * Prod/preview builds never call this — they use GitHub/Google OAuth.
 */
export async function devLogin(
    body: DevLoginRequest = {}
): Promise<DevLoginResponse | { success: boolean; userId: string }> {
    const postResponse = await fetch(`${API_BASE_URL}/dev/login/`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });
    const postBody = await postResponse.json().catch(() => ({}));
    if (postResponse.ok) {
        return postBody as DevLoginResponse;
    }

    const errorCode =
        typeof postBody === "object" && postBody && "error" in postBody
            ? String((postBody as { error?: string }).error)
            : "";
    const message =
        (typeof postBody === "object" &&
            postBody &&
            "message" in postBody &&
            String((postBody as { message?: string }).message)) ||
        errorCode ||
        `Request failed with status ${postResponse.status}`;

    if (errorCode === "UserNotFound" || errorCode === "NotFound") {
        throw new Error(message);
    }
    if (postResponse.status !== 404 && postResponse.status !== 405) {
        throw new Error(message);
    }

    let userId = body.userId;
    if (!userId) {
        const seeded = await requestDevApi<{
            users: Array<{ user: UserInfo }>;
        }>("POST", "/dev/seed/fresh-user/", { count: 1 });
        userId = seeded.users[0]?.user?.userId;
        if (!userId) {
            throw new Error("Failed to seed a fresh local test user.");
        }
    }

    // Sets the HTTP-only jwt cookie (do not use requestv2 — it may force OAuth).
    return requestDevApi(
        "GET",
        `/auth/dev/login/${encodeURIComponent(userId)}/`
    );
}

export async function getJobPostings(): Promise<JobPosting[]> {
    const response = await fetch(API_BASE_URL + "/job/", {
        cache: "no-store",
        signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) throw new Error("Could not load job postings");
    return response.json();
}
