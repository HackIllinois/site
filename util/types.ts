export type WithId<Type> = Type & { id: string };

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type FileType = "resume" | "photo" | "blobstore";

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
    isProApplicant: boolean;
    codeOfConductAcknowledge: string[];
    reviewedInformationAcknowledge: string[];
};

export type RegistrationType = {
    preferredName: string;
    legalName: string;
    gender: string;
    emailAddress: string;
    race: string[];
    requestedTravelReimbursement: boolean;
    location: string;
    degree: string;
    university: string;
    major: string;
    minor: string;
    gradYear: number;
    hackEssay1: string;
    hackEssay2: string;
    hackInterest: string[];
    hackOutreach: string[];
    dietaryRestrictions: string[];
    optionalEssay: string;
    proEssay?: string;
    considerForGeneral?: boolean;
    isProApplicant: boolean;
    hasSubmitted?: boolean;
};

export type DecisionStatus = "TBD" | "ACCEPTED" | "REJECTED" | "WAITLISTED";
export type DecisionResponse = "PENDING" | "ACCEPTED" | "DECLINED";

export type RSVPType = {
    userId: string;
    status: DecisionStatus;
    response: DecisionResponse;
    admittedPro: boolean;
    reimbursementValue: number;
    // reviewer: string;
    // emailSent: false;
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
