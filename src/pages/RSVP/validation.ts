import * as z from 'zod';

export const rsvpSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  timezone: z.string(),
  discord: z.string().regex(/^.{1,32}#\d{4}$/, 'Please enter a valid Discord username (e.g. "name#1234")').nonempty(),
  avatarUrl: z.string(),
});

export type RSVPSchema = z.infer<typeof rsvpSchema>;

export const errorMap: z.ZodErrorMap = (error, ctx) => {
  if (error.message) return { message: error.message };

  if (error.code === z.ZodErrorCode.too_small && error.type === 'string') {
    return { message: 'Required' };
  }

  if (error.code === z.ZodErrorCode.invalid_enum_value) {
    return { message: 'Required' };
  }

  return { message: ctx.defaultError };
};

export const defaultValues = {};
