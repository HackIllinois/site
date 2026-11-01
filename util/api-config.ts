// Must be read as process.env.NEXT_PUBLIC_API_BASE_URL so Next.js can inline it into browser code.
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// just checks if the API URL is set or not
if (!apiBaseUrl) {
    throw new Error(
        "NEXT_PUBLIC_API_BASE_URL is not set. Defaults live in .env.development and .env.production; override locally in .env.local."
    );
}

// The origin of the Adonix API, without a trailing slash.
export const API_BASE_URL: string = apiBaseUrl;

export const LOCAL_AUTH_ENABLED =
    process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(
        new URL(API_BASE_URL).hostname
    );
