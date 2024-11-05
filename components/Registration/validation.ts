import { z } from "zod";

const personalInfo = z.object({
    legalName: z
        .string()
        .min(1)
        .regex(/^[^ ]+ +[^ ]+.*$/, "Please enter your first and last name."),
    preferredName: z.string().min(1),
    gender: z.string().min(1),
    age: z.number().int().min(18, "You must be at least 18 years old."),
    race: z.string().array().min(1),
    emailAddress: z.string().min(1).email(),
    // https://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    phoneNumber: z
        .string()
        .min(1)
        .regex(
            /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            "Please enter a valid phone number."
        )
});

export const registrationSchemas = [personalInfo];

export let registrationSchema = z.object({});

for (const schema of registrationSchemas) {
    registrationSchema = registrationSchema.merge(schema);
}
