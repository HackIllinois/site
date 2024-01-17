import * as z from "zod";

export const registrationSchema = z.object({
    legalName: z
        .string()
        .min(1)
        .regex(/^[^ ]+ +[^ ]+.*$/, "Please enter your first and last name."),
    preferredName: z.string().min(1),
    gender: z.string().min(1),
    email: z.string().min(1).email(),
    race: z.string().array().min(1),
    ageMin: z.string().array().min(1),
    transportation: z.enum(["YES", "NO"]),
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
    proEssay: z.string().min(1),
    optionalEssay: z.string().min(1),
    hackInterest: z.string().array().min(1),
    hackOutreach: z.string().array().min(1),
    dietaryRestrictions: z.string().array().min(1),
    isProApplicant: z.enum(["YES", "NO"]),
    considerForGeneral: z.enum(["YES", "NO"])

    // terms: z.boolean().refine((val: boolean) => val),
});

// Type validation for new Schema
// export const registrationSchema = z.object({
//   name: z.string().min(1).regex(/^[^ ]+ +[^ ]+.*$/, 'Please enter your first and last name.'),
//   gender: z.string().min(1),
//   email: z.string().min(1).email(),
//   race: z.string().array().min(1),
//   age: z.number().int(),
//   phone: z.string().min(1),
//   location: z.string().min(1),
//   degreePursued: z.enum(['ASSOCIATES', 'BACHELORS', 'MASTERS', 'PHD', 'GRADUATED', 'OTHER']),
//   school: z.string().min(1),
//   major: z.string().min(1),
//   minor: z.string().min(1),
//   graduationYear: z.number().int(),
//   resumeFilename: z.string().optional(),
//   whyHack: z.string().min(1),
//   programmingYears: z.number().array().min(1),//.int().min(0).max(10),
//   programmingAbility: z.number().array().min(1),//.int().min(1).max(10),
//   interests: z.string().array().min(1),
//   outreachSurvey: z.string().array().min(1),
//   dietary: z.string().array().min(1),
//   travelReimbursement: z.string().min(1)
// });

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
    interests: [],
    outreachSurvey: [],
    ageMin: [],
    programmingYears: [],
    programmingAbility: [],
    dietary: []
};
