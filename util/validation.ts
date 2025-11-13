import { RegistrationData } from "@/util/types";
import * as Yup from "yup";

export const initialValues: RegistrationData = {
    // 0. Personal Info
    firstName: "",
    lastName: "",
    preferredName: "",
    age: "",
    emailAddress: "",

    // 1. Background Info
    gender: "",
    race: [], // multiple races can be selected
    country: "",
    state: "",
    school: "",
    studyLevel: "",
    gradYear: "",
    major: "",
    underrepresented: "",

    // 2. Application Questions
    hackEssay1: "",
    hackEssay2: "",
    optionalEssay: "",
    considerForPro: false,
    proEssay: "",

    // 3. Attending HackIllinois
    hackOutreach: [],
    hackInterest: [],
    requestedTravelReimbursement: "",
    travelAcknowledge: false,

    // 4. Review (final acknowledgements)
    reviewedAcknowledge: false,
    proChallengeAcknowledge: false,
    codeOfConductAcknowledge: false
};

// TODO: Remove this once testing is complete.
export const initialValuesPopulated: RegistrationData = {
    // 0. Personal Info
    firstName: "Miguel",
    lastName: "Aenlle",
    preferredName: "",
    age: "19",
    emailAddress: "maenlle2@illinois.edu",

    // 1. Background Info
    gender: "Man",
    race: ["Filipino"], // multiple races can be selected
    country: "United States",
    state: "Illinois",
    school: "University of Illinois at Chicago",
    studyLevel: "Post Doctorate",
    gradYear: "Fall 2027",
    major: "Mathematics or statistics",
    underrepresented: "",

    // 2. Application Questions
    hackEssay1:
        "HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great ",
    hackEssay2:
        "HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great HackIllinois is great ",
    optionalEssay: "",
    considerForPro: false,
    proEssay: "",

    // 3. Attending HackIllinois
    hackOutreach: [],
    hackInterest: [],
    requestedTravelReimbursement: "",
    travelAcknowledge: false,

    // 4. Review (final acknowledgements)
    reviewedAcknowledge: false,
    proChallengeAcknowledge: false,
    codeOfConductAcknowledge: false
};

const currentYear = new Date().getFullYear();

export const validationSchemas = [
    // 0. Personal Information
    Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        preferredName: Yup.string().nullable(),
        age: Yup.string().required("Age is required"),
        emailAddress: Yup.string()
            .email("Invalid email address")
            .required("Email is required")
    }),

    // 1. Background Information
    Yup.object({
        gender: Yup.string().required("Gender is required"),
        race: Yup.array().of(Yup.string()).min(1, "Select at least one option"),
        country: Yup.string().required("Country is required"),
        state: Yup.string().when("country", {
            is: (val: string) => !!val && val === "United States",
            then: schema => schema.required("State/Territory is required")
        }),
        school: Yup.string().required("School is required"),
        studyLevel: Yup.string().required("Level of study is required"),
        gradYear: Yup.string().required("Graduation year is required"),
        major: Yup.string().required("Major is required"),
        underrepresented: Yup.string().required("This question is required")
    }),

    // 2. Application Questions
    Yup.object({
        hackEssay1: Yup.string()
            .min(50, "Please write at least 50 characters")
            .required("This essay is required")
            .test(
                "max-50-words",
                "Response cannot be over 50 words",
                response => response.split(/[\s,—]+/).length <= 50
            ),
        hackEssay2: Yup.string()
            .min(50, "Please write at least 50 characters")
            .required("This essay is required")
            .test(
                "max-50-words",
                "Response cannot be over 50 words",
                response => response.split(/[\s,—]+/).length <= 50
            ),
        optionalEssay: Yup.string()
            .nullable()
            .test(
                "max-50-words",
                "Response cannot be over 100 words",
                response => {
                    if (!response || response.trim()) return true;
                    !!response && response.split(/[\s,—]+/).length <= 100;
                }
            ),
        considerForPro: Yup.boolean(),
        proEssay: Yup.string().when("considerForPro", {
            is: (val: boolean) => !!val,
            then: schema =>
                schema
                    .min(50, "Please write at least 50 characters")
                    .required(
                        "You must fill out this essay to be considered for pro track"
                    )
                    .test(
                        "max-50-words",
                        "Response cannot be over 50 words",
                        response => response.split(/[\s,—]+/).length <= 50
                    )
        })
    }),

    // 3. Attending HackIllinois
    Yup.object({
        hackOutreach: Yup.array()
            .of(Yup.string())
            .min(1, "Please let us know how you heard about us"),
        hackInterest: Yup.array()
            .of(Yup.string())
            .min(1, "Pick at least one interest"),
        requestedTravelReimbursement: Yup.string().required(
            "You must select an option"
        ),
        travelAcknowledge: Yup.boolean()
            .required()
            .oneOf([true], "You must acknowledge the travel policy")
    }),

    // 4. Review (final acknowledgements)
    Yup.object({
        reviewedAcknowledge: Yup.boolean()
            .required("Please confirm you have reviewed your information")
            .oneOf([true], "Please confirm you have reviewed your information"),
        proChallengeAcknowledge: Yup.boolean().when("considerForPro", {
            is: (val: boolean) => !!val,
            then: schema =>
                schema
                    .required("You must acknowledge the pro-track policy")
                    .oneOf([true], "You must acknowledge the pro-track policy")
        }),
        codeOfConductAcknowledge: Yup.boolean()
            .required("You must accept the Code of Conduct")
            .oneOf([true], "You must accept the Code of Conduct")
    }),

    // 5. Confirmation (no new inputs, keep for indexing purposes)
    Yup.object({})
];
