const ENV_VAR_NAME = "NEXT_PUBLIC_API_BASE_URL";

function throwConfigError(problem: string): never {
    throw new Error(
        `${ENV_VAR_NAME} ${problem}. Defaults live in .env.development and .env.production; override locally in .env.local.`
    );
}

function parseApiBaseUrl(rawValue: string | undefined): string {
    const value = rawValue?.trim();
    if (!value) {
        return throwConfigError("is not set");
    }

    let url: URL;
    try {
        url = new URL(value);
    } catch {
        return throwConfigError(
            `must be an absolute http or https URL, but got "${value}"`
        );
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        return throwConfigError(`must use http or https, but got "${value}"`);
    }
    if (url.username || url.password) {
        return throwConfigError("must not contain credentials");
    }
    // Endpoint paths are appended directly, so only a bare origin is valid.
    // url.search and url.hash are empty for a bare "?" or "#", so check the raw value too.
    if (
        url.pathname !== "/" ||
        url.search ||
        url.hash ||
        value.includes("?") ||
        value.includes("#")
    ) {
        return throwConfigError(
            `must be an origin with no path, query, or fragment, but got "${value}"`
        );
    }

    return url.origin;
}

// The origin of the Adonix API, without a trailing slash.
// Must be read as process.env.NEXT_PUBLIC_API_BASE_URL so Next.js can inline it into browser code.
export const API_BASE_URL: string = parseApiBaseUrl(
    process.env.NEXT_PUBLIC_API_BASE_URL
);
