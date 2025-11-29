export type WithId<Type> = Type & { id: string };

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type FileType = "resume" | "photo" | "blobstore";

export type RegistrationApplicationSubmitted = {
    userId: string;

    firstName: string;
    lastName: string;
    preferredName?: string;
    age: string;
    email: string;

    gender: string;
    race: string[];
    country: string;
    state?: string;

    school: string;
    education: string;
    graduate: string;
    major: string;
    underrepresented: string;
    hackathonsParticipated: string;

    application1: string;
    application2: string;
    application3: string;
    applicationOptional?: string;

    pro?: boolean;

    attribution: string[];
    eventInterest: string[];

    requestTravelReimbursement: boolean;
};

export type RegistrationApplicationDraftBody = {
    firstName?: string;
    lastName?: string;
    preferredName?: string;
    age?: string;
    email?: string;
    gender?: string;
    race?: string[];
    country?: string;
    state?: string;
    school?: string;
    education?: string;
    graduate?: string;
    major?: string;
    underrepresented?: string;
    hackathonsParticipated?: string;
    application1?: string;
    application2?: string;
    application3?: string;
    applicationOptional?: string;
    pro?: boolean;
    attribution?: string[];
    eventInterest?: string[];
    requestTravelReimbursement?: boolean;
};

/** Includes fields available only on the frontend. */
export type RegistrationApplicationDraftBodyForm =
    RegistrationApplicationDraftBody & {
        travelAcknowledge?: boolean;
        requestTravelReimbursement?: boolean;
        codeOfConductAcknowledge?: boolean;
        reviewedAcknowledge?: boolean;
        optInNewsletter?: boolean;
    };

export type RegistrationResponseFieldInfo = {
    key: keyof RegistrationApplicationDraftBody;
    text: string;
    options?: string[] | { value: string; label: string }[];
    proOnly?: boolean;
    customEmptyMessage?: string;
    shownResponse?: string;
};

/**
 * (!!!) RegistrationData is deprecated. Use RegistrationApplicationDraftBody instead.
 */
export type RegistrationData = {
    legalName: string;
    preferredName: string;
    gender: string;
    race: string[];
    emailAddress: string;
    location: string;
    degree: string;
    university: string;
    gradYear: string;
    major: string;
    minor: string;
    hackEssay1: string;
    hackEssay2: string;
    optionalEssay: string;
    proEssay: string;
    considerForGeneral: string[];
    hackOutreach: string[];
    hackInterest: string[];
    dietaryRestrictions: string[];
    requestedTravelReimbursement: string[];
    travelAcknowledge: string[];
    codeOfConductAcknowledge: string[];
    reviewedInformationAcknowledge: string[];
};

export type DecisionStatus = "TBD" | "ACCEPTED" | "REJECTED" | "WAITLISTED";
export type DecisionResponse = "PENDING" | "ACCEPTED" | "DECLINED";

export type RSVPType = {
    userId: string;
    status: DecisionStatus;
    response: DecisionResponse;
    admittedPro: boolean;
    reimbursementValue: number;
};

export type UserType = {
    _id: string;
    userId: string;
    email: string | null;
    name: string;
};

export enum Avatars {
    BUNNY = "bunny",
    SQUIRREL = "squirrel",
    GOBLIN = "goblin",
    CHESTER = "chester",
    CAT = "cat",
    MUSHROOM = "mushroom",
    FISHERCAT = "fishercat",
    AXOLOTL = "axolotl"
}

export type ProfileBodyType = {
    displayName: string;
    discordTag: string;
    avatarId: Avatars;
};

export type ProfileType = {
    userID: string;
    displayName: string;
    discordTag: string;
    avatarUrl: string;
    points: number;
    coins: number;
};

export type RSVPDecisionType = {
    userId: string;
    user: string;
    reviewer: string;
    whether: boolean;
};

export type RegistrationRole = "attendee" | "mentor";

export type ChallengeStatus = {
    attempts: number;
    complete: boolean;
};

export enum ChallengeResultEnum {
    Success = 0,
    Failure = 1,
    Invalid = 2
}

export type RefreshTokenResType = {
    token: string;
};

export type FormProps = {
    formIndex: number;
    setFormIndex: React.Dispatch<React.SetStateAction<number>>;
};

export interface EventType {
    id: string;
    name: string;
    description: string;
    isAsync?: boolean;
    startTime: number;
    endTime: number;
    locations: {
        description: string;
        tags: string[];
        latitude: number;
        longitude: number;
    }[];
    sponsor?: string;
    eventType: string;
    points: number;
    isPro: boolean;
}
