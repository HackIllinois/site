import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    testMatch: "*.spec.ts",
    outputDir: "../../test-results/registration",
    use: {
        baseURL: process.env.REGISTRATION_BASE_URL || "http://127.0.0.1:3018",
        channel: "chrome"
    },
    projects: [
        { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
        {
            name: "mobile",
            use: {
                viewport: { width: 390, height: 844 },
                isMobile: true,
                hasTouch: true
            }
        }
    ]
});
