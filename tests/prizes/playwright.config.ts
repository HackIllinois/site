import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: ".",
    testMatch: "page.spec.ts",
    use: { baseURL: "http://127.0.0.1:3018", channel: "chrome" },
    webServer: {
        command: "npm run dev -- --hostname 127.0.0.1 --port 3018",
        url: "http://127.0.0.1:3018",
        reuseExistingServer: true,
        timeout: 120000
    }
});
