import {
    RegistrationApplicationDraftBody,
    RegistrationApplicationDraftBodyForm,
    RegistrationData
} from "@/util/types";
import * as Yup from "yup";

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
    applicationOptional: "",
    considerForPro: false,
    applicationPro: "",
    hackathonsParticipated: "",

    // Attending HackIllinois
    attribution: [],
    eventInterest: [],
    requestTravelReimbursement: false,
    travelAcknowledge: false,

    // Review
    codeOfConductAcknowledge: false,
    reviewedAcknowledge: false
};

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
        underrepresented: Yup.string().required("This question is required")
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
        considerForPro: Yup.boolean(),
        applicationPro: Yup.string().when("considerForPro", {
            is: (val: boolean) => !!val,
            then: schema =>
                schema
                    .required(
                        "You must fill out this essay to be considered for pro track"
                    )
                    .test(
                        "min-50-words",
                        "Please write at least 50 words",
                        value => {
                            if (!value) return false;
                            const wordCount = value
                                .trim()
                                .split(/\s+/)
                                .filter(word => word.length > 0).length;
                            return wordCount >= 50;
                        }
                    )
                    .test(
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
                    )
        }),
        hackathonsParticipated: Yup.string()
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
            .oneOf([true], "You must accept the Code of Conduct")
    }),

    // 5. Confirmation (no new inputs, keep for indexing purposes)
    Yup.object({})
];
