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
        throw new APIError(responseJSON);
    }
    return responseJSON;
}

export async function getChallenge(): Promise<ChallengeStatus> {
    const res = await requestv2("GET", "/registration/challenge/");
    return res;
}

export async function getRegistration(): Promise<WithId<RegistrationType>> {
    const res = await requestv2("GET", `/registration`);
    return res;
}

// This function cannot use try/catch to avoid compiler errors :/
export async function getRegistrationOrDefault(): Promise<
    WithId<RegistrationType> | RegistrationType
> {
    const session = await auth();
    const response = await fetch(`${APIv2}/registration`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org",
            Authorization: session?.user?.name || ""
        }
    });

    const body = await response.json();

    if (!response.ok) {
        if (body.error !== "NotFound") {
            throw new APIError(body);
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
            requestedTravelReimbursement: false,
            isProApplicant: false
        };
    }

    return body;
}

export async function registerUpdate(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    const res = await requestv2("POST", `/registration`, registration);
    return res;
}

export async function registerSubmit(
    registration: RegistrationType
): Promise<WithId<RegistrationType>> {
    const res = await requestv2("POST", `/registration/submit`, registration);
    return res;
}

export async function getRSVP(): Promise<RSVPType> {
    const res = await requestv2("GET", "/admission/rsvp");
    return res;
}

export async function subscribe(
    listName: string,
    emailAddress: string
): Promise<string> {
    const res = await requestv2("POST", "/newsletter/subscribe/", {
        listName,
        emailAddress
    });
    return res;
}
