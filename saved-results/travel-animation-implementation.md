# Travel scene animation

Updated2026-11-16 (America/Detroit). PR565 builds on Travel PR564 in worktree travel-animation-2027.

## Current behavior

The opening view (including title, navigation and foreground trees) stays pinned while the first viewport of normal scroll moves the complete train past the right edge. Only then does the page descend. Scrolling back reverses the sequence. The train distance derives from its crop offset, so the full mobile train exits too. No wheel/touch events are blocked. Reduced motion and no-JavaScript modes bypass the hold and render a still scene.

The right main branch SVG filter incorrectly exported zero blur. Its blur is now10, visually fitted to the native reference; this is an estimate, not a recovered Figma setting. Geometry, left tree and other filters are unchanged; see travel-animation-artwork.md.

The existing Navbar is rendered inside the pinned Travel main; app/layout.tsx omits its outer instance only on /travel. Other routes retain their existing navigation. Reimbursement board/content, local JSON rates, map and14px disclaimer are unchanged.

## Evidence

New regression test first failed desktop/mobile because the heading moved prematurely. First implementation using parent padding still failed; replacing padding with actual scroll space fixed the sticky boundary. Focused checks4 passed3.8s; final production18 passed6.8s. Build/lint/TypeScript exit0. Capture: zero page/request errors. Desktop heading stayed223.1875px and tree0px from scroll0 to512; mobile heading132.59375px/tree0px from scroll0 to422. Released train left1442px on1440px desktop and392.005px on390px phone. No-JavaScript check confirms no sticky hold.

Run npm ci, npm run build, npm run start -- --port 3019; test with TRAVEL_BASE_URL=http://localhost:3019 npm run test:travel -- --workers=2. Logs are in travel-animation-checks/checks.log; screenshots in travel-animation-captures/{desktop,mobile}/. Do not run dev while building the same .next output.

## Limits

Chrome desktop/mobile emulation and Computer Use checked. No real iOS/Safari or low-end performance profile. Scroll duration is one viewport rather than a timed movie; very large scroll jumps can skip intermediate frames. Script-blocking extensions may not expose the no-scripting media preference, unlike browser-disabled JavaScript tested here. First-load JS186kB, route42.9kB; assets980780 bytes total, only one viewport set requested. No dependency added, no backend changes, no merge/deployment.

PR: https://github.com/HackIllinois/site/pull/565
Preview: http://localhost:3019/travel
