import * as yup from "yup";

const personalInfo = yup.object({
    legalName: yup.string().required("Please enter your full legal name"),
    preferredName: yup.string().required("Please enter your preferred name"),
    gender: yup.string().required("Please select a gender"),
    race: yup.array(yup.string()).required("Please select an ethnicity/race"),
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

const hackSpecific = yup.object({
    hackEssay1: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at least 50 words", value => {
            return value.trim().split(/\s+/).length >= 50;
        }),
    hackEssay2: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at least 50 words", value => {
            return value.trim().split(/\s+/).length >= 50;
        }),
    optionalEssay: yup.string(),
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

const proHackSpecific = yup.object({
    hackEssay1: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at least 50 words", value => {
            return value.trim().split(/\s+/).length >= 50;
        }),
    hackEssay2: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at least 50 words", value => {
            return value.trim().split(/\s+/).length >= 50;
        }),
    optionalEssay: yup.string(),
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
        .of(yup.string().required('"Other" cannot be empty')),
    requestedTravelReimbursement: yup
        .array()
        .of(yup.string())
        .min(1, "Please select one option"),
    proEssay: yup
        .string()
        .required("Please answer this question")
        .test("word-count", "Please type at least 50 words", value => {
            return value.trim().split(/\s+/).length >= 50;
        }),
    considerForGeneral: yup
        .array()
        .of(yup.string())
        .min(1, "Please select one option")
});

export function getRegistrationSchema(index: number, isProApplicant: boolean) {
    let schema = registrationSchemas[index];

    if (index === 2 && isProApplicant) {
        schema = proHackSpecific;
    }

    return schema;
}
