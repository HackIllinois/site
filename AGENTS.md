# AGENTS.md

Instructions for coding agents working in this repo.

## What this repo is right now

This is the HackIllinois attendee-facing site: Next.js 15 (App Router), React 19, TypeScript (strict), SCSS, npm.

It is in a static holdover state between events:

- The live app is a single page, `app/page.tsx`, with the 2027 interest form link and a newsletter signup.
- The full 2026 event site (registration, RSVP, profile, schedule, CTF, judges, mentors) is parked in `app.backup/` and `components.backup/`. It is not routed. See [Parked code](#parked-code).
- `hackillinois.org` currently redirects to `hype.hackillinois.org`, which is a different repo (`HackIllinois/hype-site`). This is expected. Changes merged here deploy to the `site` Cloudflare Worker but are not what visitors to `hackillinois.org` see right now.

Related repos, all under the `HackIllinois` GitHub org:

- `adonix`: the backend API this site calls.
- `hype-site`: the pre-event site currently on the main domain.
- `site-2026`: the archived 2026 site, served at `2026.hackillinois.org`.

## Commands

```sh
npm install        # also installs the Husky pre-commit hook
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run lint       # next lint, then prettier --check
npm run format     # prettier --write
npx tsc --noEmit   # typecheck
```

There is no test suite. To verify a change, run `npm run lint` and `npx tsc --noEmit`, then load the affected page in the dev server.

## Directory map

- `app/`: the live routes. Currently only the root layout and `page.tsx`.
- `components/`: components used by the live page (`Button`, `Container`, `EmailSubscribeInput`, `Footer`, `Navbar`).
- `app.backup/`, `components.backup/`: the parked 2026 event site.
- `util/`: the API client (`api.ts`, `api-config.ts`), shared types (`types.ts`), form validation and select options.
- `hooks/`: shared React hooks.
- `modules/`: static data (footer links; schools, majors, states and countries for form dropdowns).
- `theme/`: the MUI theme and `next/font` definitions.
- `public/`: static assets, grouped by page.
- `design-reference/`: design exports for reference. Not imported by code.

The import alias `@/*` maps to the repo root, for example `@/components/Button/Button`.

## Conventions

- Prettier settings: 4-space indent, double quotes, semicolons, no trailing commas, no parentheses around a single arrow function argument. Run `npm run format` instead of formatting by hand.
- Each component lives in its own folder as `Name/Name.tsx` with its styles beside it, normally `Name.module.scss`.
- Add `"use client"` only to components that need state, effects or browser APIs.
- Style the live page with SCSS. MUI, Formik and Yup are used only by the parked registration code.
- Unused imports are a lint error. Prefix intentionally unused variables and arguments with `_`.
- Put images in `public/<page>/` and reference them by path.

## Talking to the backend (Adonix)

- The API origin comes from the `NEXT_PUBLIC_API_BASE_URL` environment variable. It is read once, in `util/api-config.ts`, and exported as `API_BASE_URL` with no trailing slash.
- Import `API_BASE_URL` wherever the origin is needed. Do not hardcode `adonix.hackillinois.org`, and do not read `process.env.NEXT_PUBLIC_API_BASE_URL` anywhere else.
- Defaults are committed in `.env.development` (used by `next dev`) and `.env.production` (used by `next build`).
- To point at a local Adonix, create `.env.local` containing `NEXT_PUBLIC_API_BASE_URL=http://localhost:3000`. That file is gitignored.
- The value is inlined at build time, so restart the dev server or rebuild after changing it. If it is unset, `util/api-config.ts` throws on import.
- Make API calls through `util/api.ts`. Add a function there for a new endpoint instead of calling `fetch` from a component, and put request and response types in `util/types.ts`.
- `requestv2` throws the error body on a non-OK response and redirects to GitHub login when the token is missing or invalid.
- Newsletter list names passed to `subscribe()` are free-form strings. Adonix creates a list for any name it has not seen, so a typo silently creates a new list. The live list name is `hackillinois2026_interest`; do not rename it unless asked.

## Parked code

`app.backup/` and `components.backup/` hold the 2026 event site as reference.

- Do not import from them in live code.
- Do not delete them, and do not move them back into `app/` or `components/`, unless asked.
- Keep them compiling. They are type-checked, and they import from `util/`, `hooks/` and `theme/`, so a change to a shared type or function can break them. Several files in those directories (`util/options.ts`, `util/validation.ts`, `util/config.ts`, the hooks, `theme/`) are used only by the parked code, so they are not dead.
- Imports inside them use the `@/app.backup/...` and `@/components.backup/...` paths.

## Gotchas

- `npm run lint` runs ESLint only on `app/` and `components/`. Files in `util/`, `hooks/`, `theme/` and the parked directories are linted only by the pre-commit hook, and only when staged. Prettier and `tsc` do cover the whole repo.
- The pre-commit hook runs `lint-staged`, which applies ESLint fixes and Prettier to staged files, so committed content can differ from what was staged.
- `npm run lint` on a clean checkout passes with two unused-variable warnings in `components/Navbar/Navbar.tsx`.
- `.eslintrc.json` turns off `@next/next/no-img-element`, `@next/next/no-page-custom-font` and `jsx-a11y/alt-text` for the static holdover page. Do not treat that as the standard for new event pages.

## Git, CI and deployment

- Branch from `main` and open a pull request against `main`.
- Two checks run on each pull request:
    - `lint`: GitHub Actions, `npm ci` then `npm run lint` on Node 20.
    - `Workers Builds: site`: Cloudflare builds the branch with OpenNext and comments a preview URL on the pull request.
- Merging to `main` deploys to the `site` Cloudflare Worker (`wrangler.json`, `open-next.config.ts`). Do not run `wrangler deploy` by hand.

## Boundaries

- `.env.development` and `.env.production` are committed and hold public values only. Anything prefixed `NEXT_PUBLIC_` is shipped to the browser, so never put a secret in one.
- Do not edit `package-lock.json` by hand. Change dependencies with `npm install`.
- Do not replace or remove the PDFs and sponsor assets in `public/` unless asked.
