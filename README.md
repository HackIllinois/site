# The Official Website of HackIllinois 2025

## Getting started

```bash
npm install
npm run dev
```

No extra configuration is needed. By default the site talks to the production Adonix API.

## API configuration

The Adonix API origin is set by one environment variable, `NEXT_PUBLIC_API_BASE_URL`. It must be a bare origin (scheme, host, and optional port) with no path, such as `https://adonix.hackillinois.org`. The site fails with a configuration error if it is missing or malformed.

Defaults are committed and point at production Adonix:

| File               | Used by         |
| ------------------ | --------------- |
| `.env.development` | `npm run dev`   |
| `.env.production`  | `npm run build` |

These files are committed, so they must only hold public values. Never put secrets in them.

### Using a local Adonix

Create a `.env.local` file in the repository root (it is gitignored):

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

Then run the site on a different port, since Adonix also defaults to port 3000:

```bash
npm run dev -- -p 3001
```

Things to know:

- Adonix must already be running locally. This setting does not configure its database or make OAuth sign-in work locally.
- Use `localhost`, not `127.0.0.1`. Adonix's CORS rules only allow the `localhost` hostname.
- `.env.local` applies to both `npm run dev` and `npm run build`, so a local build made while it exists targets the local API.
- Precedence, highest first: shell or host build variables, `.env.development.local` / `.env.production.local`, `.env.local`, then the committed defaults.
- The value is embedded at build time. Restart the dev server after changing an environment file, and rebuild to change a deployed bundle.
