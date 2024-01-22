import * as z from "zod";

export const registrationSchema = z.object({
    legalName: z
        .string()
        .min(1)
        .regex(/^[^ ]+ +[^ ]+.*$/, "Please enter your first and last name."),
    preferredName: z.string().min(1),
    gender: z.string().min(1),
    emailAddress: z.string().min(1).email(),
    race: z.string().array().min(1),
    ageMin: z.string().array().min(1),
    transportation: z.string().array().min(1),
    requestedTravelReimbursement: z.enum(["YES", "NO"]),
    location: z.string().min(1),
    degree: z.enum([
        "ASSOCIATES",
        "BACHELORS",
        "MASTERS",
        "PHD",
        "GRADUATED",
        "OTHER"
    ]),
    university: z.string().min(1),
    major: z.string().min(1),
    minor: z.string().min(1),
    gradYear: z.number().int(),
    hackEssay1: z.string().min(1),
    hackEssay2: z.string().min(1),
    proEssay: z.string().optional(),
    optionalEssay: z.string().optional(),
    hackInterest: z.string().array().min(1),
    hackOutreach: z.string().array().min(1),
    dietaryRestrictions: z.string().array().min(1),
    considerForGeneral: z.enum(["YES", "NO"]).optional(),
    resumeFileName: z.string().optional()

    // terms: z.boolean().refine((val: boolean) => val),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;

export const errorMap: z.ZodErrorMap = (error, ctx) => {
    if (error.message) return { message: error.message };

    if (error.code === z.ZodIssueCode.too_small && error.type === "string") {
        return { message: "Required" };
    }

    if (error.code === z.ZodIssueCode.too_small && error.type === "array") {
        return { message: "Required" };
    }

    if (error.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Required" };
    }

    return { message: ctx.defaultError };
};

export const defaultValues = {
    race: [],
    hackInterest: [],
    hackOutreach: [],
    ageMin: [],
    dietaryRestrictions: [],
    transportation: [],
    proEssay: "",
    optionalEssay: "",
};
