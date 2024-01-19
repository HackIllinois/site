export type WithId<Type> = Type & { id: string };

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type FileType = "resume" | "photo" | "blobstore";

// Old Types!
export type RegistrationType = {
    preferredName: string;
    legalName: string;
    gender: string;
    email: string;
    race: string[];
    requestedTravelReimbursement: "YES" | "NO";
    location: string;
    degree:
        | "ASSOCIATES"
        | "BACHELORS"
        | "MASTERS"
        | "PHD"
        | "GRADUATED"
        | "OTHER";
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
    proEssay: string;
    considerForGeneral: "YES" | "NO";
    isProApplicant: "YES" | "NO";
};

export type DecisionStatus = "TBD" | "ACCEPTED" | "REJECTED" | "WAITLISTED";
export type DecisionResponse = "PENDING" | "ACCEPTED" | "DECLINED";

export type RSVPType = {
    userId: string;
    status: DecisionStatus;
    response: DecisionResponse;
    admittedPro: boolean;
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

//New Registration Type
// export type RegistrationType = {
//     firstName: string;
//     lastName: string;
//     gender: string;
//     email: string;
//     phone: string;
//     race: string[];
//     age: number;
//     location: string;
//     degreePursued:
//     | 'ASSOCIATES'
//     | 'BACHELORS'
//     | 'MASTERS'
//     | 'PHD'
//     | 'GRADUATED'
//     | 'OTHER';
//     school: string;
//     major: string;
//     minor: string;
//     graduationYear: number;
//     resumeFilename?: string | undefined;
//     whyHack: string;
//     programmingYears: number;//number;
//     programmingAbility: number;//number;
//     interests: string[];
//     outreachSurvey: string[];
//     dietary: string[];
//     travelReimbursement: string
//   };

export type RegistrationRole = "attendee" | "mentor";

export type RefreshTokenResType = {
    token: string;
};
