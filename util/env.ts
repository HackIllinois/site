/**
 * Type-safe environment variable access.
 * Add new env variables to the `envVars` object below and to `next.config.js`'s `env` option.
 */

const envVars = {
    VITE_BASE_API_URL: process.env.VITE_BASE_API_URL
} as const;

type EnvKey = keyof typeof envVars;

export function getEnv(key: EnvKey): string {
    const value = envVars[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
