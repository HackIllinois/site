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

// function handleError(body) {
//     alert(body.message || body);

//     throw new APIError(body);
// }

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
        console.log("to", to);
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
    // if (response.status === 403) {
    //     alert(
    //         "Your session has expired. Please close this tab and log in again."
    //     );
    //     sessionStorage.removeItem("token");
    //     // TODO: Call the authenticate endpoint, making the user reauthenticate
    // }

    const responseJSON = await response.json();

    if (
        responseJSON.error === "TokenInvalid" &&
        !process.env.NEXT_PUBLIC_REACT_APP_TOKEN
    ) {
        sessionStorage.removeItem("token");
        await new Promise(resolve => setTimeout(resolve, 10));
        authenticate(window.location.href);
        return;
    }

    if (response.status !== 200) {
        throw new APIError(responseJSON);
    }
    return responseJSON;
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
    //.catch(() => handleError);
}

export function getRegistrationOrDefault(): Promise<
    WithId<RegistrationType> | RegistrationType
> {
    return requestv2("GET", `/registration`).catch(() => {
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

    //     .catch((body) => {
    //         if (body.error === "NotFound") {
    //             return null;
    //         }

    //         handleError(body);
    // });
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
                : Number.parseInt(registration.gradYear, 10),
        considerForGeneral: registration.considerForGeneral
            ? registration.considerForGeneral[0] === "YES"
            : undefined
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
            : ["NO"],
        considerForGeneral:
            registration.considerForGeneral === undefined
                ? undefined
                : registration.considerForGeneral
                  ? ["YES"]
                  : ["NO"]
    };
}
