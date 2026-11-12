/**
 * Workers Builds for `site-preview` may run `npm run build` then Wrangler.
 * A plain `next build` is not standalone and does not create `.open-next/worker.js`.
 *
 * When Cloudflare CI is running and we are NOT already inside
 * `opennextjs-cloudflare build` (which sets NEXT_PRIVATE_STANDALONE before
 * invoking npm run build), run a full OpenNext build so deploy/preview has
 * Worker artifacts.
 */
const { execSync } = require("node:child_process");

if (process.env.WORKERS_CI !== "1") {
    process.exit(0);
}

// Already packaging via `opennextjs-cloudflare build` → do not recurse.
if (process.env.NEXT_PRIVATE_STANDALONE === "true") {
    process.exit(0);
}

execSync("npx opennextjs-cloudflare build", {
    stdio: "inherit",
    env: process.env
});
