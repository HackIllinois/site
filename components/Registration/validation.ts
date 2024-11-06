import { z } from "zod";

const pdfResume = z
    .string()
    .endsWith(".pdf", "Please upload a valid file type");
const docxResume = z
    .string()
    .endsWith(".docx", "Please upload a valid file type");

const personalInfo = z.object({
    legalName: z
        .string()
        .regex(/^[^ ]+ +[^ ]+.*$/, "Please enter your first and last name."),
    preferredName: z.string().min(1, "Please enter your preferred name"),
    gender: z.string().min(1, "Please select a gender"),
    age: z.coerce
        .number()
        .int("Please enter a valid age")
        .min(18, "You must be at least 18 years old."),
    race: z.string().min(1, "Please select a race/ethnicity"),
    emailAddress: z.string().email("Please enter a valid email address"),
    phoneNumber: z
        .string()
        .regex(
            /^\+?\d{1,3}?\s?\(?\b\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
            "Please enter a valid phone number."
        )
});

const education = z.object({
    school: z.string().min(1, "Please select a school (or N/A)"),
    gradYear: z.string().min(1, "Please select a graduation year"),
    major: z.string().min(1, "Please select a major (or N/A)"),
    minor: z.string(),
    resume: pdfResume.or(docxResume).optional()
});

const hackSpecific = z.object({
    interestExplanation: z.string().min(1, "Please answer this question"),
    heardAbout: z
        .string()
        .array()
        .nonempty("Please select at least one option"),
    lookingForwardTo: z
        .string()
        .array()
        .nonempty("Please select at least one option"),
    allergiesRestrictions: z.string().array(),
    travelReimbursement: z.string().array().nonempty("Please select one")
});

const transportation = z.object({
    travelAcknowledge: z.string().array().nonempty("Please select one"),
    travelMethod: z.string().array().nonempty("Please select one")
});

export const registrationSchemas = [
    personalInfo,
    education,
    hackSpecific,
    transportation
];

export function getFullSchema() {
    let registrationSchema = z.object({});

    for (const schema of registrationSchemas) {
        registrationSchema = registrationSchema.merge(schema);
    }

    return registrationSchema;
}
