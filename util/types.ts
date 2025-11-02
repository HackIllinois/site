import {
    degreeOptions,
    graduationYearOptions,
    locationOptions,
    majorOptions,
    schoolOptions
} from "@/app/register/(general)/(form)/education/options";
import {
    allergiesRestrictionsOptions,
    generalConsiderationOptions,
    heardAboutOptions,
    lookingForwardToOptions
} from "@/app/register/(general)/(form)/hack-specific/options";
import {
    gender,
    race
} from "@/app/register/(general)/(form)/personal-info/options";
import {
    travelAcknowledgeOptions,
    travelReimbursementOptions
} from "@/app/register/(general)/(form)/transportation/options";

export type WithId<Type> = Type & { id: string };

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type FileType = "resume" | "photo" | "blobstore";

export type RegistrationData = {
    // 0. Personal Information
    firstName: string;
    lastName: string;
    preferredName: string;
    age: string;
    emailAddress: string;
    // 1. Background Information
    gender: string;
    race: string[];
    country: string;
    state: string;
    school: string;
    studyLevel: string;
    gradYear: string;
    major: string;
    underrepresented: string;
    // 2. Application Questions
    hackEssay1: string;
    hackEssay2: string;
    optionalEssay: string;
    considerForPro: boolean;
    proEssay: string;
    // 3. Attending HackIllinois
    hackOutreach: string[];
    hackInterest: string[];
    requestedTravelReimbursement: string;
    travelAcknowledge: boolean;
    // 4. Review (final acknowledgements)
    reviewedAcknowledge: boolean;
    proChallengeAcknowledge: boolean;
    codeOfConductAcknowledge: boolean;
};

export type RegistrationResponseFieldInfo = {
    key: keyof RegistrationData;
    text: string;
    options?: string[] | { value: string; label: string }[];
    proOnly?: boolean;
    customEmptyMessage?: string;
    shownResponse?: string;
};

export type RegistrationType = {
    // 0. Personal Information
    firstName: string;
    lastName: string;
    preferredName: string;
    age: string;
    emailAddress: string;
    // 1. Background Information
    gender: string;
    race: string[];
    country: string;
    state: string;
    school: string;
    studyLevel: string;
    gradYear: string;
    major: string;
    underrepresented: string;
    // 2. Application Questions
    hackEssay1: string;
    hackEssay2: string;
    optionalEssay: string;
    considerForPro: boolean;
    proEssay: string;
    // 3. Attending HackIllinois
    hackOutreach: string[];
    hackInterest: string[];
    requestedTravelReimbursement: string;
    travelAcknowledge: boolean;
    // 4. Review (final acknowledgements)
    reviewedAcknowledge: boolean;
    proChallengeAcknowledge: boolean;
    codeOfConductAcknowledge: boolean;
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
