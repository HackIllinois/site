"use server";
import { auth } from "@/auth";
import {
    MethodType,
    RegistrationType,
    WithId,
    RSVPType,
    ChallengeStatus
} from "./types";
import { APIError } from "./error";

const APIv2 = "https://adonix.hackillinois.org";

function handleError(body: { message: string; status: number; type: string }) {
    if (body && body.message) {
        alert(body.message);
    } else {
        alert(body);
    }

    throw new APIError(body);
}

export async function requestv2(
    method: MethodType,
    endpoint: string,
    body?: unknown
) {
    const session = await auth();
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org",
            Authorization: session?.user?.name || ""
        },
        body: JSON.stringify(body)
    });

    const responseJSON = await response.json();

    if (!response.ok) {
        throw responseJSON;
    }
    return responseJSON;
}

export async function getChallenge(): Promise<ChallengeStatus> {
    return requestv2("GET", "/registration/challenge/");
}

export async function getRegistration(): Promise<WithId<RegistrationType>> {
    return requestv2("GET", `/registration`).catch(body => handleError(body));
}

export async function getRegistrationOrDefault(): Promise<
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

export async function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return requestv2("POST", `/registration`, registration).catch(body =>
        handleError(body)
    );
}

export async function registerSubmit(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    return requestv2("POST", `/registration/submit`, registration).catch(body =>
        handleError(body)
    );
}

export async function getRSVP(): Promise<RSVPType> {
    return requestv2("GET", "/admission/rsvp").catch(body => handleError(body));
}

export async function subscribe(
    listName: string,
    emailAddress: string
): Promise<string> {
    return requestv2("POST", "/newsletter/subscribe/", {
        listName,
        emailAddress
    }).catch(body => handleError(body));
}
