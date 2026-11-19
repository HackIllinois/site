import { defineConfig } from "@playwright/test";

const baseURL = process.env.CHALLENGE_BASE_URL ?? "http://127.0.0.1:3041";

export default defineConfig({
    use: {
        baseURL,
        channel: "chrome",
        viewport: { width: 1280, height: 844 },
        reducedMotion: "reduce"
    },
    webServer: process.env.CHALLENGE_BASE_URL
        ? undefined
        : {
              command: "npm run dev -- --hostname 127.0.0.1 --port 3041",
              url: "http://127.0.0.1:3041",
              reuseExistingServer: true,
              timeout: 120000
          }
});
