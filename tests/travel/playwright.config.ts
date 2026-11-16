import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    testMatch: "travel.spec.ts",
    outputDir: "../../test-results/travel",
    use: {
        baseURL: process.env.TRAVEL_BASE_URL || "http://127.0.0.1:3017",
        browserName: "chromium",
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
