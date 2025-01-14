import * as yup from "yup";

const maxWords = (maxWords: number) => (value: string) => {
    return value.trim().split(/\s+/).length <= maxWords;
};

const personalInfo = yup.object({
    legalName: yup.string().required("Please enter your full legal name"),
    preferredName: yup.string().required("Please enter your preferred name"),
    gender: yup.string().required("Please select a gender"),
    race: yup
        .array(yup.string())
        .min(1, "Please select an ethnicity/race")
        .required("Please select an ethnicity/race"),
    emailAddress: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter a valid email address")
});

const education = yup.object({
    location: yup.string().required("Please select a location"),
    university: yup.string().required("Please select a school (or N/A)"),
    degree: yup.string().required("Please select a degree (or N/A)"),
    gradYear: yup.string().required("Please select a graduation year"),
    major: yup.string().required("Please select a major (or N/A)"),
    minor: yup.string(),
    resumeFileName: yup
        .string()
        .matches(
            /((\.pdf)|(\.docx)|(\.doc))$/,
            "Please upload a valid file type"
        )
});

const hackSpecificGeneralItems = {
    hackEssay1: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at most 50 words", maxWords(50)),
    hackEssay2: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at most 100 words", maxWords(100)),
    optionalEssay: yup
        .string()
        .test("word-count", "Please type at most 50 words", value => {
            return !value || maxWords(50)(value);
        }),
    hackOutreach: yup
        .array()
        .of(yup.string().required('"Other" cannot be empty'))
        .min(1, "Please select at least one option"),
    hackInterest: yup
        .array()
        .of(yup.string().required('"Other" cannot be empty'))
        .min(1, "Please select at least one option"),
    dietaryRestrictions: yup
        .array()
        .of(yup.string().required('"Other" cannot be empty'))
};

const hackSpecific = yup.object(hackSpecificGeneralItems);

// Pro applicants answer additional questions
const proHackSpecific = yup.object({
    ...hackSpecificGeneralItems,
    proEssay: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at most 300 words", maxWords(300)),
    considerForGeneral: yup
        .array()
        .of(yup.string())
        .min(1, "Please select one option")
});

const transportation = yup.object({
    requestedTravelReimbursement: yup
        .array()
        .of(yup.string())
        .min(1, "Please select one option"),
    travelAcknowledge: yup.array().of(yup.string()).min(1, "Please acknowledge")
});

const registrationSchemas = [
    personalInfo,
    education,
    hackSpecific,
    transportation
];

export function getRegistrationSchema(index: number, isProApplicant: boolean) {
    let schema = registrationSchemas[index];

    if (index === 2 && isProApplicant) {
        schema = proHackSpecific;
    }

    return schema;
}

export const reviewSchema = yup.object({
    reviewedInformationAcknowledge: yup
        .array()
        .of(yup.string())
        .min(1, "Please review your information"),
    codeOfConductAcknowledge: yup
        .array()
        .of(yup.string())
        .min(1, "You must accept to register")
});
