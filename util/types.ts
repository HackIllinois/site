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

export type RegistrationResponseFieldInfo = {
    key: keyof RegistrationData;
    text: string;
    options?: string[] | { value: string; label: string }[];
    proOnly?: boolean;
    customEmptyMessage?: string;
    shownResponse?: string;
};

export const registrationFieldGroups: RegistrationResponseFieldInfo[][] = [
    [
        {
            key: "legalName",
            text: "Full Legal Name"
        },
        {
            key: "preferredName",
            text: "Preferred Name"
        },
        {
            key: "emailAddress",
            text: "Email Address"
        },
        {
            key: "gender",
            text: "Gender",
            options: gender
        },
        {
            key: "race",
            text: "Race/Ethnicity",
            options: race
        }
    ],
    [
        {
            key: "location",
            text: "What state/country are you currently residing in?",
            options: locationOptions
        },
        {
            key: "university",
            text: "What university do you attend",
            options: schoolOptions
        },
        {
            key: "degree",
            text: "What degree are you currently pursuing",
            options: degreeOptions
        },
        {
            key: "gradYear",
            text: "Graduation Year",
            options: graduationYearOptions
        },
        {
            key: "major",
            text: "Major",
            options: majorOptions
        },
        {
            key: "minor",
            text: "Minor",
            options: majorOptions
        }
    ],
    [
        {
            key: "hackEssay1",
            text: "(50 words) What opportunity, event, or feature of HackIllinois 2025 are you most excited to take part in and why?"
        },
        {
            key: "hackEssay2",
            text: "(50 words) Talk about a challenge you faced in the field of CS and how you overcame it. This challenge can be related to a technical personal project, experience in a field, personal experience with diversity/inclusions, etc. We recommend you keep your response to under 50 words, but we will accept responses up to 100 words."
        },
        {
            key: "optionalEssay",
            text: "(Optional, 50 words) If you feel as though an essential aspect of your experience/background has not been included in your application, please use this space to do so. Your application will not be negatively impacted if you choose not to answer this question."
        },
        {
            key: "proEssay",
            text: "How did you complete the coding challenge?",
            proOnly: true
        },
        {
            key: "considerForGeneral",
            text: "Would you like to be considered for HackIllinois's General hackathon? This does not impact your Knights application, but will be considered if you are not selected for Knights.",
            options: generalConsiderationOptions,
            proOnly: true
        },
        {
            key: "hackOutreach",
            text: "How did you hear about HackIllinois?",
            options: heardAboutOptions
        },
        {
            key: "hackInterest",
            text: "Which of these aspects of the hackathon would you most be interested in engaging in?",
            options: lookingForwardToOptions
        },
        {
            key: "dietaryRestrictions",
            text: "What food restrictions or allergies do you have?",
            options: allergiesRestrictionsOptions
        }
    ],
    [
        {
            key: "requestedTravelReimbursement",
            text: "Would you like to be considered for travel reimbursement?",
            options: travelReimbursementOptions
        },
        {
            key: "travelAcknowledge",
            text: "Are you aware that you are responsible for your own transportation to HackIllinois?",
            options: travelAcknowledgeOptions,
            shownResponse: "Yes"
        }
    ]
];

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

export type ProfileBodyType = {
    displayName: string;
    discordTag: string;
    avatarId: string;
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

export type RegistrationStatus = {
    alive: boolean;
};

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
