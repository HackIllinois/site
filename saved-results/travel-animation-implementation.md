# Travel scene animation

2026-11-15, America/Detroit. Implements approved scroll-driven scene motion from Comp 1_8.mp4 in isolated branch codex/travel-animation-2027, based on Travel947c158.

The existing Motion dependency maps the hero scroll distance to train travel (0 to110% of scene width over first65% of hero scroll) and foreground upward movement (0 to8% of full scene height over hero scroll). A stable invisible hero-size target measures progress. Native page scrolling remains unchanged; scrolling back reverses the scene. Board, map, JSON rates and disclaimer stay unchanged.

Three separately exported Figma layers per viewport replace two flattened scene images. Mobile train crop retains cars initially outside the viewport. Source IDs and coordinates are in travel-animation-artwork.md. No dependency added. CSS reduced-motion rule disables transforms immediately, including preference changes; this avoids the installed Motion useReducedMotion hook limitation that does not update its state on live preference changes. No-JavaScript first render assembles the still scene.

Checks: new6 browser cases failed before implementation. Development18 passed15.0s; production18 passed9.4s. Build and TypeScript exit0. Initial lint failed only on artwork Markdown formatting, fixed before final lint. Desktop/mobile capture produced zero page/request errors. Computer Use inspected scrolling on both sizes. Existing board position verified stable by browser checks. No policy/content edits. No new diagnostic logger for display-only transforms.

Reproduce: npm ci; npm run build; npm run start -- --port 3019 (use a space between --port and 3019). In another terminal: TRAVEL_BASE_URL=http://localhost:3019 npm run test:travel -- --workers=2. Logs saved in travel-animation-checks/checks.log. Do not run dev and build against the same .next output simultaneously.

Limits: Chrome desktop/mobile emulation tested; no real iOS/Safari or low-end performance profiling. Video timing becomes scroll distance; not a frame-for-frame video playback. SVG export texture/blur limitations remain. New assets total952772 bytes vs763496 bytes for removed flattened scenes. Build reports first-load JS182kB (previous141kB) due to animation library on this route. Browser selects only its desktop or mobile assets. No merge or deployment performed.

Final npm run lint: exit 0; all files formatted, existing unrelated warnings only. git diff --check: exit 0.

PR: https://github.com/HackIllinois/site/pull/565 (base codex/travel-2027 / PR #564). Preview remains at http://localhost:3019/travel.
