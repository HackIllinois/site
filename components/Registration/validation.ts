import * as yup from "yup";

const personalInfo = yup.object({
    legalName: yup
        .string()
        .required("Please enter your first and last name")
        .matches(
            /^[^ ]+ +[^ ]+.*$/,
            "Please enter both your first and last name"
        ),
    preferredName: yup.string().required("Please enter your preferred name"),
    gender: yup.string().required("Please select a gender"),
    age: yup
        .number()
        .required("Please enter your age")
        .positive("Please enter a valid age")
        .integer("Please enter a valid age")
        .min(18, "You must be at least 18 years old."),
    race: yup.string().required("Please select an ethnicity/race"),
    emailAddress: yup
        .string()
        .required("Please enter your email address")
        .email("Please enter a valid email address"),
    phoneNumber: yup
        .string()
        .required("Please enter your phone number")
        .matches(
            /^\+?\d{0,3}\s?\(?\b\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
            "Please enter a valid phone number."
        )
});

const education = yup.object({
    university: yup.string().required("Please select a school (or N/A)"),
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
    hackEssay1: yup.string().required("Please answer this question"),
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
        .min(1, "Please select one option")
});

const transportation = yup.object({
    travelAcknowledge: yup
        .array()
        .of(yup.string())
        .min(1, "Please select one option"),
    travelMethod: yup
        .array()
        .of(yup.string())
        .min(1, "Please select one option")
});

export const registrationSchemas = [
    personalInfo,
    education,
    hackSpecific,
    transportation
];
