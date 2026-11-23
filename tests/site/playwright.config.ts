import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    testMatch: "*.spec.ts",
    outputDir: "../../test-results/site",
    use: {
        baseURL: process.env.SITE_BASE_URL || "http://127.0.0.1:3023",
        browserName: "chromium",
        channel: "chrome"
    },
    projects: [
        { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
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
