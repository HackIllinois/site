import {
    MethodType,
    RegistrationType,
    WithId,
    RegistrationData,
    FileType,
    RSVPType,
    ChallengeStatus
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

function handleError(body: { message: string; status: number; type: string }) {
    if (body && body.message) {
        alert(body.message);
    } else {
        alert(body);
    }

    throw new APIError(body);
}

export const isAuthenticated = (): string | null =>
    sessionStorage.getItem("token");

export function authenticate(to: string): void {
    localStorage.setItem("to", to);
    const authUrl = `${APIv2}/auth/login/github/?redirect=${window.location.origin}/auth/`;
    window.location.replace(authUrl);
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
    return requestv2("GET", "/registration/challenge/");
}

export function getRegistration(): Promise<WithId<RegistrationType>> {
    return requestv2("GET", `/registration`).catch(body => handleError(body));
}

export function getRegistrationOrDefault(): Promise<
    WithId<RegistrationType> | RegistrationType
> {
    return requestv2("GET", `/registration`).catch(body => {
        if (body.error !== "NotFound") {
            handleError(body);
        }

        return {
            legalName: "",
            preferredName: "",
            gender: "",
            age: 0,
            race: [],
            emailAddress: "",
            phoneNumber: "",
            location: "",
            degree: "",
            university: "",
            gradYear: 0,
            major: "",
            minor: "",
            resumeFileName: "",
            hackEssay1: "",
            hackEssay2: "",
            optionalEssay: "",
            hackOutreach: [],
            hackInterest: [],
            dietaryRestrictions: [],
            requestedTravelReimbursement: false,
            travelAcknowledge: [],
            travelMethod: [],
            isProApplicant: false
        };
    });
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
        const errorBody = await res.json();
        handleError(errorBody);
    }
    return res;
}

export function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return requestv2("POST", `/registration`, registration).catch(body =>
        handleError(body)
    );
}

export function registerSubmit(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return requestv2("POST", `/registration/submit`, registration).catch(body =>
        handleError(body)
    );
}

export function registrationToAPI(
    registration: RegistrationData
): RegistrationType {
    return {
        ...registration,
        requestedTravelReimbursement:
            registration.requestedTravelReimbursement[0] === "YES",
        gradYear:
            registration.gradYear === ""
                ? 0
                : Number.parseInt(registration.gradYear, 10),
        considerForGeneral: registration.considerForGeneral
            ? registration.considerForGeneral[0] === "YES"
            : undefined
    };
}

export function registrationFromAPI(
    registration: RegistrationType
): RegistrationData {
    // Convert boolean requested travel reimbursement to yes/no selection
    const requestedTravelReimbursement = [];
    if (registration.requestedTravelReimbursement !== undefined) {
        requestedTravelReimbursement.push(
            registration.requestedTravelReimbursement ? "YES" : "NO"
        );
    }

    return {
        ...registration,
        gradYear: registration.gradYear === 0 ? "" : `${registration.gradYear}`,
        requestedTravelReimbursement,
        considerForGeneral:
            registration.considerForGeneral === undefined
                ? undefined
                : registration.considerForGeneral
                  ? ["YES"]
                  : ["NO"],
        travelAcknowledge: [], // Must default to an empty array for formik
        reviewedInformationAcknowledge: [], // Must default to an empty array for formik
        codeOfConductAcknowledge: [] // Must default to an empty array for formik
    };
}

export function getRSVP(): Promise<RSVPType> {
    return requestv2("GET", "/admission/rsvp").catch(body => handleError(body));
}
