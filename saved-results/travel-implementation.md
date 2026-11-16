# Travel page implementation

Date: 2026-11-15 (America/Detroit). Task: implement Figma desktop/mobile Travel page and create a PR.

## Result

The 2027 desert scene and wooden reimbursement board replace the old space-themed travel page. Text remains HTML. State selection supports pointer, touch, keyboard, and a select menu; the international ticket supports hover, click/tap, Enter and Escape. No decorative animation. The shared 2027 navbar is reused, and /travel joins the frontier layout without the old countdown/footer.

All 51 state/district amounts were compared with the original source and are unchanged. The DC key is now District of Columbia to match the existing atlas. All six international entries retain their original amounts. Eligibility and opt-in rules are unchanged in meaning. These are preserved repository values, not independently confirmed 2027 policy.

## Checks and reproduction

- `npm ci`: exit 0.
- `npm run test:travel -- --workers=2`: 10 failures before implementation, then final production run 10 passed in 6.3 seconds, exit 0.
- `npm run lint`: exit 0; existing warnings elsewhere, no formatting failures.
- `npx tsc --noEmit`: exit 0.
- `npm run build`: exit 0; /travel statically rendered, 38.8 kB route and 141 kB first-load JS reported.
- `git diff --check`: exit 0.
- Computer Use inspected desktop, 390px mobile and final 320px ticket; selector returned Illinois $100 and ticket showed international rates.

Run `npm ci`, `npm run build`, then `npm run start -- --port 3017`. In another terminal run `npm run test:travel`. Tests use installed Google Chrome (`channel: chrome`). `TRAVEL_BASE_URL` can point at another running server. Do not run a build and dev server against the same .next directory: an overlapping check in this session failed from shared build output; it was discarded and replaced by the passing production run.

Live logs during this task: `tail -f /tmp/travel-production.log /tmp/travel-green.log /tmp/travel-build.log`. Completed evidence is preserved in travel-checks/checks.log. No backend changes or paid calls.

## Limits

Figma Hand was replaced with Caveat; Ultra and Manrope match the design. SVG export texture/foreground blur differ from the native PNG. Fonts/assets/provenance are in travel-artwork.md. Real iOS/Safari and screen-reader software were not tested; browser touch/keyboard checks and Computer Use were performed. No separate unit tests for static markup; full-page tests cover the interactions. No new diagnostic logger was added for display-only selection with no services, persisted data, or caught errors.

Searched STATE_REIMBURSEMENT, InteractiveMap, MapLegend, EllipseHeader across the repo: only the Travel route used them. Removed superseded components/styles. The existing atlas names revealed the DC mismatch; other state names match. Existing public PDFs and old public assets remain untouched. App Router files follow the established framework layout.

The HTML report is the complete human review handoff. No merge or manual deployment performed.

PR: https://github.com/HackIllinois/site/pull/564 (open; CI running at handoff). Separate Prizes PR: https://github.com/HackIllinois/site/pull/563.

## Map emphasis follow-up — 2026-11-15

Removed the dropdown at the user's request. State hover/tap/keyboard focus shows a parchment cap label beside the state, dismissed by outside tap or Escape. Map fills the content width; unchanged disclaimer appears below at 12px without dark panels. Legend spacing is tighter.

New label tests: 2 expected failures before implementation. New dropdown/layout tests: 2 expected failures before implementation. Final production: 14 passed (3.8s); build, lint and TypeScript exit 0. Lint ran before the final spacing-only edit; formatting checked again before commit. Computer Use inspected desktop and 390px phone. No real Safari or screen-reader test.

Search for Choose a state, stateSelect, stateElements, styles.selection in app/travel and tests/travel found no leftover uses. Current screenshots: travel-label-captures/desktop.webp and mobile.webp. See the updated HTML report for exact diff and full evidence.
