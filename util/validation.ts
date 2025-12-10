import { RegistrationApplicationDraftBodyForm } from "@/util/types";
import * as Yup from "yup";

/**
 * Initial values for the form. We shouldn't initialize with undefined values
 * because Formik treats undefined values as uncontrolled inputs.
 */
export const initialValues: RegistrationApplicationDraftBodyForm = {
    // Personal Information
    firstName: "",
    lastName: "",
    preferredName: "",
    age: "",
    email: "",

    // Education
    education: "",
    school: "",
    graduate: "",
    major: "",
    country: "",
    state: "",
    race: [],
    gender: "",
    underrepresented: "",

    // Application Questions
    application1: "",
    application2: "",

    // This will be left blank intentionally.
    application3: "<INTENTIONALLY BLANK>",

    applicationOptional: "",
    pro: false,
    hackathonsParticipated: "",

    // Attending HackIllinois
    attribution: [],
    eventInterest: [],
    requestTravelReimbursement: false,
    travelAcknowledge: false,

    // Review
    reviewedAcknowledge: false,
    codeOfConductAcknowledge: false,
    mlhDataSharingAcknowledge: false,
    mlhNewsletter: true,
    optInHackNewsletter: true
};

/**
 * Given raw form values, return a draft content object with only filled fields.
 */
export const valuesToDraftContent = (
    values: RegistrationApplicationDraftBodyForm
) => {
    const draftContent: RegistrationApplicationDraftBodyForm = {};
    for (const key in values) {
        const value = values[key as keyof RegistrationApplicationDraftBodyForm];
        if (
            value !== "" &&
            !(Array.isArray(value) && value.length === 0) &&
            value !== undefined
        ) {
            // TODO: Avoid the use of any here.
            draftContent[key as keyof RegistrationApplicationDraftBodyForm] =
                value as any;
        }
    }
    return draftContent;
};

/**
 * Treats all fields as optional, so the user can save progress even if they haven't filled out all fields.
 * Used during autosaves, since we don't expect all fields to be filled.
 */
export const draftValidationSchemas = [
    // 0. Personal Information
    Yup.object({
        firstName: Yup.string(),
        lastName: Yup.string(),
        preferredName: Yup.string().nullable(),
        age: Yup.string(),
        email: Yup.string().email("Invalid email address")
    }),

    // 1. Background Information
    Yup.object({
        education: Yup.string(),
        school: Yup.string(),
        graduate: Yup.string(),
        major: Yup.string(),
        country: Yup.string(),
        state: Yup.string(),
        race: Yup.array().of(Yup.string()).min(1, "Select at least one option"),
        gender: Yup.string(),
        underrepresented: Yup.string()
    }),

    // 2. Application Questions
    Yup.object({
        application1: Yup.string().test(
            "max-50-words",
            "Response cannot be over 50 words",
            value => {
                if (!value) return true;
                const wordCount = value
                    .trim()
                    .split(/\s+/)
                    .filter(word => word.length > 0).length;
                return wordCount <= 50;
            }
        ),
        application2: Yup.string().test(
            "max-50-words",
            "Response cannot be over 50 words",
            value => {
                if (!value) return true;
                const wordCount = value
                    .trim()
                    .split(/\s+/)
                    .filter(word => word.length > 0).length;
                return wordCount <= 50;
            }
        ),
        applicationOptional: Yup.string().test(
            "max-100-words",
            "Response cannot be over 100 words",
            value => {
                if (!value || !value.trim()) return true;
                const wordCount = value
                    .trim()
                    .split(/\s+/)
                    .filter(word => word.length > 0).length;
                return wordCount <= 100;
            }
        ),
        pro: Yup.boolean(),
        hackathonsParticipated: Yup.string()
    }),

    // 3. Attending HackIllinois
    Yup.object({
        attribution: Yup.array().of(Yup.string()),
        eventInterest: Yup.array().of(Yup.string()),
        requestTravelReimbursement: Yup.boolean(),
        travelAcknowledge: Yup.boolean()
    }),

    // 4. Review (final acknowledgements)
    Yup.object({
        reviewedAcknowledge: Yup.boolean()
            .required("Please confirm you have reviewed your information")
            .oneOf([true], "Please confirm you have reviewed your information"),
        codeOfConductAcknowledge: Yup.boolean()
            .required("You must accept the Code of Conduct")
            .oneOf([true], "You must accept the Code of Conduct")
    }),

    // 5. Confirmation (no new inputs, keep for indexing purposes)
    Yup.object({})
];

/**
 * Validates draft content, ensuring that all required fields are filled.
 * Used during page navigation (we expect the page to be filled before the user moves forward)
 * and final submission (we expect all fields to be filled).
 */
export const validationSchemas = [
    // 0. Personal Information
    Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        preferredName: Yup.string().nullable(),
        age: Yup.string().required("Age is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required")
    }),

    // 1. Background Information
    Yup.object({
        education: Yup.string().required("Level of study is required"),
        school: Yup.string().required("School is required"),
        graduate: Yup.string().required("Graduation year is required"),
        major: Yup.string().required("Major is required"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().when("country", {
            is: (val: string) => !!val && val === "United States",
            then: schema => schema.required("State/Territory is required")
        }),
        race: Yup.array().of(Yup.string()).min(1, "Select at least one option"),
        gender: Yup.string().required("Gender is required"),
        underrepresented: Yup.string().required("This question is required"),
        hackathonsParticipated: Yup.string().required("This field is required.")
    }),

    // 2. Application Questions
    Yup.object({
        application1: Yup.string()
            .required("This essay is required")
            .test("max-50-words", "Response cannot be over 50 words", value => {
                if (!value) return true;
                const wordCount = value
                    .trim()
                    .split(/\s+/)
                    .filter(word => word.length > 0).length;
                return wordCount <= 50;
            }),
        application2: Yup.string()
            .required("This essay is required")
            .test("max-50-words", "Response cannot be over 50 words", value => {
                if (!value) return true;
                const wordCount = value
                    .trim()
                    .split(/\s+/)
                    .filter(word => word.length > 0).length;
                return wordCount <= 50;
            }),
        application3: Yup.string()
            .required("This essay is required")
            .test(
                "max-100-words",
                "Response cannot be over 100 words",
                value => {
                    if (!value || !value.trim()) return true;
                    const wordCount = value
                        .trim()
                        .split(/\s+/)
                        .filter(word => word.length > 0).length;
                    return wordCount <= 100;
                }
            ),
        applicationOptional: Yup.string()
            .nullable()
            .test(
                "max-100-words",
                "Response cannot be over 100 words",
                value => {
                    if (!value || !value.trim()) return true;
                    const wordCount = value
                        .trim()
                        .split(/\s+/)
                        .filter(word => word.length > 0).length;
                    return wordCount <= 100;
                }
            ),
        pro: Yup.boolean()
    }),

    // 3. Attending HackIllinois
    Yup.object({
        attribution: Yup.array()
            .of(Yup.string())
            .min(1, "Please let us know how you heard about us"),
        eventInterest: Yup.array()
            .of(Yup.string())
            .min(1, "Pick at least one interest"),
        requestTravelReimbursement: Yup.boolean(),
        travelAcknowledge: Yup.boolean()
            .required()
            .oneOf([true], "You must acknowledge the travel policy")
    }),

    // 4. Review (final acknowledgements)
    Yup.object({
        reviewedAcknowledge: Yup.boolean()
            .required("Please confirm you have reviewed your information")
            .oneOf([true], "Please confirm you have reviewed your information"),
        codeOfConductAcknowledge: Yup.boolean()
            .required("You must accept the Code of Conduct")
            .oneOf([true], "You must accept the Code of Conduct"),
        mlhDataSharingAcknowledge: Yup.boolean()
            .required("You must agree to share your data with MLH")
            .oneOf([true], "You must agree to share your data with MLH")
    }),

    // 5. Confirmation (no new inputs, keep for indexing purposes)
    Yup.object({})
];
