import {
    MethodType,
    RegistrationType,
    WithId,
    RegistrationData
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

export function getRegistration(): Promise<WithId<RegistrationType>> {
    return requestv2("GET", `/registration`);
}

export function getRegistrationOrDefault(): Promise<
    WithId<RegistrationType> | RegistrationType
> {
    return getRegistration().catch(() => {
        return {
            legalName: "",
            preferredName: "",
            gender: "",
            age: 0,
            race: [],
            emailAddress: "",
            phoneNumber: "",
            university: "",
            gradYear: 0,
            major: "",
            minor: "",
            resumeFileName: "",
            hackEssay1: "",
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

export function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    console.log("submitted", registration);
    return requestv2("POST", `/registration`, registration);
}

export function registrationToAPI(
    registration: RegistrationData
): RegistrationType {
    return {
        ...registration,
        race: [registration.race],
        requestedTravelReimbursement:
            registration.requestedTravelReimbursement[0] === "YES",
        gradYear:
            registration.gradYear === ""
                ? 0
                : Number.parseInt(registration.gradYear, 10)
    };
}

export function registrationFromAPI(
    registration: RegistrationType
): RegistrationData {
    return {
        ...registration,
        race: registration.race.length === 1 ? registration.race[0] : "",
        gradYear: registration.gradYear === 0 ? "" : `${registration.gradYear}`,
        requestedTravelReimbursement: registration.requestedTravelReimbursement
            ? ["YES"]
            : ["NO"]
    };
}
