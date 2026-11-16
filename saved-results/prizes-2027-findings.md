# Prizes 2027 implementation evidence

Date: 2026-11-15. Branch: codex/prizes-2027. Base: 1230e241ce6a57c4792838df08d32bfb235c9aad.

Figma source: https://www.figma.com/design/9SMl0fLhpbfHbN9YFCvQjj/HackIllinois-2027--Website?node-id=2678-252

MacBook Air - 4 is the complete desktop reference (1280 × 6946). No mobile frame found on Prizes; user approved stacked adaptation. User later corrected the content decision: keep sample data because old prize inventory is incomplete. Repeated entries, sponsor labels, amounts, and sample eligibility come from Figma, with an explicit preview notice. They are not verified final awards.

PNG and SVG exported through signed-in Figma UI. SVG export included IDs and kept text as text. Extracted scenery, signpost, and three cat/barrel groups; removed baked-in headings, rewards, and sponsor image labels so content is selectable HTML. Rendered to WebP with existing sharp dependency (no new runtime library). Original exports remain in ~/Downloads/MacBook Air - 4.svg and .png. Temporary extraction scripts /tmp/extract-prizes-art.py and /tmp/prizes-art/render.cjs are local tooling, not runtime dependencies.

Reproduce: npm ci; npm run test:prizes; npm run lint; npx tsc --noEmit; npm run build. Playwright uses installed Chrome and port 3018. Build after stopping dev because Next shares .next. Current runtime npm run start -- --hostname 127.0.0.1 --port 3018.

Evidence: valid pre-change red5/5 failed; dev green5/5; production green5/5 in3.0s; lint0 with existing warnings; final tsc0; build0. Initial browser attempt used Travel3017, excluded. First tsc found FAQ importing prizes/animations; restored the shared file then tsc0. CUA native Chrome verified rendered hero and Track anchor reaching Track Prizes. Phone390 screenshot and touch test, widths320/390/1440 all no overflow.

Search: rg prizes/ and old component names across app/components found FAQ uses old animations and stars artwork, retained. Registration SectionHeader is a separate component and untouched. No external callers of seven deleted prize-only components found. Runtime logging omitted: static display and native anchors have no inputs/API/caught-error paths; diagnostic output is test/build logs.

PR: https://github.com/HackIllinois/site/pull/563. GitHub connector returned403; authenticated gh fallback created it.

## Local editing follow-up

User requested familiar local data maintenance, not a shop API. Moved sample-prizes.ts to app/prizes/content/prize-data.ts, added adjacent README.md, and updated page import. Data equality comparison against the prior commit passed after excluding the new comment; tsc exit0 and focused Next lint exit0. No behavior or award changes. Rename/docs exception: no new red/green tests, build or browser checks; existing production preview left running.

## Visible notice removal

User requested removal of the visible sample-information notice. Removed the markup and unused desktop/mobile CSS, changed tests to assert absence, and updated editing guide. Sample data unchanged (byte comparison passed). Pre-change targeted test1 failed; production tests5 passed in2.4s after build exit0. Focused lint exit0. Production preview refreshed on3018; current screenshots embedded in HTML report.
