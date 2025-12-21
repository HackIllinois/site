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
    phoneNumber?: string;

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
    phoneNumber?: string;
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
    mlhNewsletter?: boolean;
};

/** Includes fields available only on the frontend. */
export type RegistrationApplicationDraftBodyForm =
    RegistrationApplicationDraftBody & {
        travelAcknowledge?: boolean;
        requestTravelReimbursement?: boolean;
        reviewedAcknowledge?: boolean;
        codeOfConductAcknowledge?: boolean;
        mlhDataSharingAcknowledge?: boolean;
        optInHackNewsletter?: boolean;
        otherSchool?: string;
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

export type ProfileBodyType = {
    displayName: string;
    discordTag: string;
    avatarId: string;
};

export type ProfileType = {
    userId: string;
    displayName: string;
    discordTag: string;
    avatarUrl: string;
    points: number;
    coins: number;
};

export type AuthRoles = {
    id: string;
    roles: string[];
};

export type RSVPDecisionType = {
    userId: string;
    user: string;
    reviewer: string;
    whether: boolean;
};

export type RegistrationRole = "attendee" | "mentor";

export type RegistrationStatus = {
    alive: boolean;
};

export type ChallengeStatus = {
    inputFileId: string;
    attempts: number;
    complete: boolean;
};

export type ChallengeResponse = {
    status: number;
    body: any;
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

export enum Avatars {
    ARTEMIS = "artemis",
    ZEUS = "zeus",
    APHRODITE = "aphrodite",
    POSEIDON = "poseidon",
    APOLLO = "apollo",
    ATHENA = "athena",
    MEDUSA = "medusa",
    HADES = "hades"
}

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
