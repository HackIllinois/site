export type WithId<Type> = Type & { id: string };

export type MethodType = "GET" | "POST" | "PUT" | "DELETE";
export type FileType = "resume" | "photo" | "blobstore";


export type RegistrationType = {
    preferredName: string;
    legalName: string;
    gender: string;
    emailAddress: string;
    race: string[];
    requestedTravelReimbursement: Boolean;
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
    proEssay?: string;
    considerForGeneral: Boolean;
    isProApplicant: Boolean;
    resumeFileName?: string;
};

export type RegistrationRole = "attendee" | "mentor";

export type RefreshTokenResType = {
    token: string;
};

export type FormProps = {
    formIndex: number;
    setFormIndex: React.Dispatch<React.SetStateAction<number>>;
};
