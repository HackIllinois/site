// Must be read as process.env.NEXT_PUBLIC_API_BASE_URL so Next.js can inline it into browser code.
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!apiBaseUrl) {
    throw new Error(
        "NEXT_PUBLIC_API_BASE_URL is not set. Defaults live in .env.development and .env.production; override locally in .env.local."
    );
}

// The origin of the Adonix API, without a trailing slash.
export const API_BASE_URL: string = apiBaseUrl;
