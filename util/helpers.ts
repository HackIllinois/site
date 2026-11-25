import { APIError } from "./error";

export function handleError(body: {
    message: string;
    status: number;
    type: string;
}) {
    if (body && body.message) {
        alert(body.message);
    } else {
        alert(body);
    }
    throw new APIError(body);
}

const MAX_INTERNATIONAL_PHONE_DIGITS = 15;

/**
 * Formats phone input as it is typed and drops anything that is not part of a
 * phone number. US numbers become "(217) 555-0100"; a leading "+" keeps the
 * number international, as "+" followed by its digits.
 */
export function formatPhoneNumber(input: string): string {
    const digits = input.replace(/\D/g, "");

    if (input.trim().startsWith("+")) {
        return `+${digits.slice(0, MAX_INTERNATIONAL_PHONE_DIGITS)}`;
    }

    const area = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const line = digits.slice(6, 10);
    // Punctuation is only added once the digits after it exist, so deleting
    // back through it never gets stuck.
    if (!area) return "";
    if (!prefix) return `(${area}`;
    if (!line) return `(${area}) ${prefix}`;
    return `(${area}) ${prefix}-${line}`;
}

/** Ten digits for a US number, or "+" and 8 to 15 digits for any other. */
export function isValidPhoneNumber(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    if (value.trim().startsWith("+")) {
        return digits.length >= 8 && digits.length <= 15;
    }
    return digits.length === 10;
}
