import { OTHER_SCHOOL_OPTION } from "@/app/register/general/constants/registration";
import {
    FIRST_HACKATHON_OPTION,
    OTHER_MAJOR_OPTION,
    OTHER_PLEASE_SPECIFY,
    OTHER_VC_PLEASE_SPECIFY,
    schoolOptions,
    US_COUNTRY_OPTION
} from "@/util/options";
import {
    ProfileFormInfo,
    RegistrationApplicationDraftBodyForm
} from "@/util/types";
import * as Yup from "yup";

const maxWordsTest = (maxWords: number) =>
    Yup.string().test(
        `max-${maxWords}-words`,
        `Response cannot be over ${maxWords} words`,
        value => {
            if (!value || !value.trim()) return true;
            const wordCount = value
                .trim()
                .split(/\s+/)
                .filter(word => word.length > 0).length;
            return wordCount <= maxWords;
        }
    );

/**
 * Initial values for the form. We shouldn't initialize with undefined values
 * because Formik treats undefined values as uncontrolled inputs.
 * EXCEPTION: boolean radio fields use undefined to prevent preselection.
 */
export const initialValues: RegistrationApplicationDraftBodyForm = {
    // 1. Personal Details
    firstName: "",
    lastName: "",
    preferredName: "",
    age: "",
    email: "",
    phoneNumber: "",

    // 2. Background Information
    gender: "",
    race: [],
    country: "",
    state: "",
    school: "",
    otherSchool: "",
    education: "",
    graduate: "",
    major: "",
    otherMajor: "",
    underrepresented: "",
    hackathonsParticipated: "",
    firstHackathonReason: "",

    // 3. Application Questions
    interestSoftware: "",
    interestHardware: "",
    hasResume: false,
    resumeFileName: "",
    application1: "",
    application2: "",
    applicationOptional: "",
    pro: false,
    portfolioLink: "",
    application3: "",

    // 4. Attending HackIllinois
    attribution: [],
    otherAttribution: "",
    eventInterest: [],
    otherEventInterest: "",
    requestTravelReimbursement: undefined,
    travelAcknowledge: false,
    vcInvolvement: [],
    otherVcInvolvement: "",
    hardwareInterest: "",
    eventSuggestions: "",

    // 5. Review & Submit
    reviewedAcknowledge: false,
    proChallengeAcknowledge: false,
    codeOfConductAcknowledge: false,
    mlhDataSharingAcknowledge: false,
    mlhNewsletter: false,
    legalAcknowledge: false,
    optInHackNewsletter: true
};

const FRONTEND_ONLY_KEYS: (keyof RegistrationApplicationDraftBodyForm)[] = [
    "travelAcknowledge",
    "reviewedAcknowledge",
    "codeOfConductAcknowledge",
    "mlhDataSharingAcknowledge",
    "optInHackNewsletter",
    "otherSchool",
    "otherMajor",
    "otherAttribution",
    "otherEventInterest",
    "otherVcInvolvement",
    "proChallengeAcknowledge",
    "hasResume",
    "resumeFileName",
    "legalAcknowledge"
];

const mergeSpecifyOption = (
    values: string[] | undefined,
    specifyOption: string,
    customText: string | undefined
): string[] | undefined => {
    if (!values) return values;
    if (!values.includes(specifyOption)) return values;
    const trimmed = (customText || "").trim();
    if (!trimmed) return values;
    return values.map(value =>
        value === specifyOption ? `${specifyOption}: ${trimmed}` : value
    );
};

const splitSpecifyValue = (
    value: string,
    specifyOption: string
): { selected: string; custom: string } => {
    const prefix = `${specifyOption}:`;
    if (value.startsWith(prefix)) {
        return {
            selected: specifyOption,
            custom: value.slice(prefix.length).trim()
        };
    }
    return { selected: value, custom: "" };
};

const hydrateSpecifyArray = (
    values: string[] | undefined,
    specifyOption: string
): { values: string[]; custom: string } => {
    if (!values?.length) return { values: values || [], custom: "" };
    let custom = "";
    const hydrated = values.map(value => {
        const split = splitSpecifyValue(value, specifyOption);
        if (split.selected === specifyOption && split.custom) {
            custom = split.custom;
        }
        return split.selected;
    });
    return { values: hydrated, custom };
};

/**
 * Expand API draft values into form-only fields (otherSchool, please-specify, etc.).
 */
export const hydrateDraftFormValues = (
    draft: RegistrationApplicationDraftBodyForm
): RegistrationApplicationDraftBodyForm => {
    const merged: RegistrationApplicationDraftBodyForm = {
        ...initialValues,
        ...draft
    };

    const savedSchool = (draft.school ?? "").trim();
    const isListedSchool =
        savedSchool === "" ||
        schoolOptions.includes(savedSchool) ||
        savedSchool === OTHER_SCHOOL_OPTION;
    if (savedSchool && !isListedSchool) {
        merged.school = OTHER_SCHOOL_OPTION;
        merged.otherSchool = savedSchool;
    } else {
        merged.otherSchool = "";
    }

    const savedMajor = (draft.major ?? "").trim();
    const majorSplit = splitSpecifyValue(savedMajor, OTHER_MAJOR_OPTION);
    if (majorSplit.selected === OTHER_MAJOR_OPTION) {
        merged.major = OTHER_MAJOR_OPTION;
        merged.otherMajor = majorSplit.custom;
    } else {
        merged.otherMajor = "";
    }

    const attribution = hydrateSpecifyArray(
        draft.attribution,
        OTHER_PLEASE_SPECIFY
    );
    merged.attribution = attribution.values;
    merged.otherAttribution = attribution.custom;

    const eventInterest = hydrateSpecifyArray(
        draft.eventInterest,
        OTHER_PLEASE_SPECIFY
    );
    merged.eventInterest = eventInterest.values;
    merged.otherEventInterest = eventInterest.custom;

    const vcInvolvement = hydrateSpecifyArray(
        draft.vcInvolvement,
        OTHER_VC_PLEASE_SPECIFY
    );
    merged.vcInvolvement = vcInvolvement.values;
    merged.otherVcInvolvement = vcInvolvement.custom;

    // Resume uploads are session-scoped; draft reload still requires re-upload.
    merged.hasResume = false;
    merged.resumeFileName = "";
    merged.proChallengeAcknowledge = false;
    merged.travelAcknowledge = false;
    merged.reviewedAcknowledge = false;
    merged.codeOfConductAcknowledge = false;
    merged.mlhDataSharingAcknowledge = false;
    merged.legalAcknowledge = false;

    return merged;
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

    if (draftContent.school === OTHER_SCHOOL_OPTION) {
        draftContent.school = (draftContent.otherSchool || "").trim();
    }

    // Only relevant when the applicant has never been to a hackathon.
    if (draftContent.hackathonsParticipated !== FIRST_HACKATHON_OPTION) {
        delete draftContent.firstHackathonReason;
    }

    // State is only asked for US residents.
    if (draftContent.country !== US_COUNTRY_OPTION) {
        delete draftContent.state;
    }

    if (draftContent.major === OTHER_MAJOR_OPTION) {
        const otherMajor = (draftContent.otherMajor || "").trim();
        if (otherMajor) {
            draftContent.major = `${OTHER_MAJOR_OPTION}: ${otherMajor}`;
        }
    }

    draftContent.attribution = mergeSpecifyOption(
        draftContent.attribution,
        OTHER_PLEASE_SPECIFY,
        draftContent.otherAttribution
    );
    draftContent.eventInterest = mergeSpecifyOption(
        draftContent.eventInterest,
        OTHER_PLEASE_SPECIFY,
        draftContent.otherEventInterest
    );
    draftContent.vcInvolvement = mergeSpecifyOption(
        draftContent.vcInvolvement,
        OTHER_VC_PLEASE_SPECIFY,
        draftContent.otherVcInvolvement
    );

    for (const key of FRONTEND_ONLY_KEYS) {
        delete draftContent[key];
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
        email: Yup.string().email("Invalid email address"),
        phoneNumber: Yup.string()
    }),

    // 1. Background Information
    Yup.object({
        education: Yup.string(),
        school: Yup.string(),
        otherSchool: Yup.string().when("school", {
            is: OTHER_SCHOOL_OPTION,
            then: schema => schema.trim().required("Please enter your school"),
            otherwise: schema => schema.notRequired()
        }),
        graduate: Yup.string(),
        major: Yup.string(),
        otherMajor: Yup.string().when("major", {
            is: OTHER_MAJOR_OPTION,
            then: schema => schema.trim().required("Please specify your major"),
            otherwise: schema => schema.notRequired()
        }),
        country: Yup.string(),
        state: Yup.string(),
        race: Yup.array().of(Yup.string()),
        gender: Yup.string(),
        underrepresented: Yup.string(),
        hackathonsParticipated: Yup.string(),
        firstHackathonReason: maxWordsTest(150)
    }),

    // 2. Application Questions
    Yup.object({
        interestSoftware: Yup.string(),
        interestHardware: Yup.string(),
        application1: maxWordsTest(150),
        application2: maxWordsTest(150),
        application3: maxWordsTest(150),
        applicationOptional: maxWordsTest(200),
        pro: Yup.boolean(),
        hasResume: Yup.boolean(),
        portfolioLink: Yup.string().url("Please enter a valid URL")
    }),

    // 3. Attending HackIllinois
    Yup.object({
        attribution: Yup.array().of(Yup.string()),
        otherAttribution: Yup.string().when("attribution", {
            is: (val: string[]) =>
                Array.isArray(val) && val.includes(OTHER_PLEASE_SPECIFY),
            then: schema => schema.trim().required("Please specify"),
            otherwise: schema => schema.notRequired()
        }),
        eventInterest: Yup.array().of(Yup.string()),
        otherEventInterest: Yup.string().when("eventInterest", {
            is: (val: string[]) =>
                Array.isArray(val) && val.includes(OTHER_PLEASE_SPECIFY),
            then: schema => schema.trim().required("Please specify"),
            otherwise: schema => schema.notRequired()
        }),
        vcInvolvement: Yup.array().of(Yup.string()),
        otherVcInvolvement: Yup.string().when("vcInvolvement", {
            is: (val: string[]) =>
                Array.isArray(val) && val.includes(OTHER_VC_PLEASE_SPECIFY),
            then: schema => schema.trim().required("Please specify"),
            otherwise: schema => schema.notRequired()
        }),
        hardwareInterest: maxWordsTest(100),
        eventSuggestions: maxWordsTest(150),
        requestTravelReimbursement: Yup.boolean().nullable(),
        travelAcknowledge: Yup.boolean()
    }),

    // 4. Review (final acknowledgements)
    Yup.object({
        reviewedAcknowledge: Yup.boolean(),
        codeOfConductAcknowledge: Yup.boolean(),
        mlhDataSharingAcknowledge: Yup.boolean(),
        proChallengeAcknowledge: Yup.boolean(),
        legalAcknowledge: Yup.boolean()
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
            .required("Email is required"),
        phoneNumber: Yup.string().required("Phone number is required")
    }),

    // 1. Background Information
    Yup.object({
        education: Yup.string().required("Level of study is required"),
        school: Yup.string().required("School is required"),
        otherSchool: Yup.string().when("school", {
            is: OTHER_SCHOOL_OPTION,
            then: schema => schema.trim().required("Please enter your school"),
            otherwise: schema => schema.notRequired()
        }),
        graduate: Yup.string().required("Graduation year is required"),
        major: Yup.string().required("Major is required"),
        otherMajor: Yup.string().when("major", {
            is: OTHER_MAJOR_OPTION,
            then: schema => schema.trim().required("Please specify your major"),
            otherwise: schema => schema.notRequired()
        }),
        country: Yup.string().required("Country is required"),
        state: Yup.string().when("country", {
            is: US_COUNTRY_OPTION,
            then: schema => schema.required("State/Territory is required"),
            otherwise: schema => schema.notRequired()
        }),
        race: Yup.array()
            .of(Yup.string())
            .min(1, "Race / Ethnicity is required"),
        gender: Yup.string().required("Gender is required"),
        underrepresented: Yup.string().required("This question is required"),
        hackathonsParticipated: Yup.string().required("This field is required"),
        firstHackathonReason: Yup.string().when("hackathonsParticipated", {
            is: FIRST_HACKATHON_OPTION,
            then: schema =>
                schema
                    .trim()
                    .required("This field is required")
                    .concat(maxWordsTest(150)),
            otherwise: schema => schema.notRequired()
        })
    }),

    // 2. Application Questions
    Yup.object({
        interestSoftware: Yup.string()
            .required("Please rank Software")
            .oneOf(["1", "2"], "Rank must be 1 or 2"),
        interestHardware: Yup.string()
            .required("Please rank Hardware")
            .oneOf(["1", "2"], "Rank must be 1 or 2")
            .test(
                "distinct-ranks",
                "Software and Hardware must have different ranks",
                function (value) {
                    const { interestSoftware } = this.parent;
                    if (!value || !interestSoftware) return true;
                    return value !== interestSoftware;
                }
            ),
        application1: Yup.string()
            .required("This essay is required")
            .concat(maxWordsTest(150)),
        application2: Yup.string()
            .required("This essay is required")
            .concat(maxWordsTest(150)),
        hasResume: Yup.boolean()
            .required("Please upload your resume")
            .oneOf([true], "Please upload your resume"),
        application3: Yup.string()
            .required("This essay is required")
            .concat(maxWordsTest(150)),
        applicationOptional: maxWordsTest(200),
        pro: Yup.boolean(),
        portfolioLink: Yup.string().url(
            "Please enter a valid URL (including https://)"
        )
    }),

    // 3. Attending HackIllinois
    Yup.object({
        attribution: Yup.array()
            .of(Yup.string())
            .min(1, "Please let us know how you heard about us"),
        otherAttribution: Yup.string().when("attribution", {
            is: (val: string[]) =>
                Array.isArray(val) && val.includes(OTHER_PLEASE_SPECIFY),
            then: schema => schema.trim().required("Please specify"),
            otherwise: schema => schema.notRequired()
        }),
        eventInterest: Yup.array()
            .of(Yup.string())
            .min(1, "Pick at least one interest"),
        otherEventInterest: Yup.string().when("eventInterest", {
            is: (val: string[]) =>
                Array.isArray(val) && val.includes(OTHER_PLEASE_SPECIFY),
            then: schema => schema.trim().required("Please specify"),
            otherwise: schema => schema.notRequired()
        }),
        vcInvolvement: Yup.array()
            .of(Yup.string())
            .min(1, "Pick at least one option"),
        otherVcInvolvement: Yup.string().when("vcInvolvement", {
            is: (val: string[]) =>
                Array.isArray(val) && val.includes(OTHER_VC_PLEASE_SPECIFY),
            then: schema => schema.trim().required("Please specify"),
            otherwise: schema => schema.notRequired()
        }),
        hardwareInterest: Yup.string()
            .required("This field is required")
            .concat(maxWordsTest(100)),
        eventSuggestions: Yup.string()
            .required("This field is required")
            .concat(maxWordsTest(150)),
        requestTravelReimbursement: Yup.boolean().required(
            "Please select Yes or No"
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
        codeOfConductAcknowledge: Yup.boolean()
            .required("You must accept the Code of Conduct")
            .oneOf([true], "You must accept the Code of Conduct"),
        mlhDataSharingAcknowledge: Yup.boolean()
            .required("You must agree to share your data with MLH")
            .oneOf([true], "You must agree to share your data with MLH"),
        proChallengeAcknowledge: Yup.boolean().when("pro", {
            is: true,
            then: schema =>
                schema
                    .required(
                        "You must acknowledge the Saloon Rush challenge requirement"
                    )
                    .oneOf(
                        [true],
                        "You must acknowledge the Saloon Rush challenge requirement"
                    ),
            otherwise: schema => schema.notRequired()
        }),
        legalAcknowledge: Yup.boolean()
            .required("You must acknowledge the HackIllinois legal terms")
            .oneOf([true], "You must acknowledge the HackIllinois legal terms")
    }),

    // 5. Confirmation (no new inputs, keep for indexing purposes)
    Yup.object({})
];

export const profileValidationSchema = Yup.object({
    displayName: Yup.string()
        .required("Display name is required")
        .max(100, "Display name cannot exceed 100 characters"),
    discordTag: Yup.string()
        .required("Discord tag is required")
        .max(64, "Discord tag cannot exceed 64 characters"),
    shirtSize: Yup.string()
        .required("Shirt size is required")
        .oneOf(
            ["XS", "S", "M", "L", "XL", "2XL"],
            "Please select a valid shirt size"
        ),
    dietaryRestrictions: Yup.array().of(Yup.string()),
    otherDietaryRestrictions: Yup.string().max(
        1000,
        "Other dietary restrictions cannot exceed 1000 characters"
    ),
    avatarId: Yup.string()
});

export const profileInitialValues: ProfileFormInfo = {
    displayName: "",
    discordTag: "",
    shirtSize: "",
    dietaryRestrictions: [],
    otherDietaryRestrictions: "",
    avatarId: "character1"
};
