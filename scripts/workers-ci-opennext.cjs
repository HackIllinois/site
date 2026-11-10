/**
 * Workers Builds for `site-preview` may run `npm run build` then `wrangler deploy`.
 * Plain `next build` does not create `.open-next/worker.js`, so package here when
 * Cloudflare CI is running and we are not already inside `opennextjs-cloudflare build`
 * (which sets NEXT_PRIVATE_STANDALONE before invoking npm run build).
 */
const { execSync } = require("node:child_process");

if (process.env.WORKERS_CI !== "1") {
    process.exit(0);
}

if (process.env.NEXT_PRIVATE_STANDALONE === "true") {
    process.exit(0);
}

execSync("npx opennextjs-cloudflare build --skipNextBuild", {
    stdio: "inherit",
    env: process.env
});
