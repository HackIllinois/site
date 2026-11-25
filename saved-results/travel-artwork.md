# Travel artwork and fonts

Date: 2026-11-15 (America/Detroit). Purpose: reusable decorative assets for the 2027 travel page, with policy and interaction text rendered separately as HTML.

## Source

Figma file `9SMl0fLhpbfHbN9YFCvQjj`, Travel Reimbursement page. Desktop frame `1553:12`, 1440 × 3132; mobile frame `2099:17`, 402 × 2420. Exported PNG references and SVG with **Include id attribute** enabled and **Outline text** disabled. Source exports are in Downloads, not included in the website payload.

All assets below were extracted from the actual Figma layers. No generated illustration was used. The decorative HACK ILLINOIS lettering and logo remain part of the wood sign. Other text was removed from these assets so the page can supply readable HTML.

## Outputs

Paths are relative to `public/travel/frontier/`. Crop values are `x y width height` in the original frame.

| File                               | Dimensions  | Bytes  | Source layers / crop                                                                                  |
| ---------------------------------- | ----------- | ------ | ----------------------------------------------------------------------------------------------------- |
| scene/scene.webp                   | 1440 × 3132 | 608592 | Desktop root children, excluding menu bar, Travel Information, Group 711, Ticket, Nail_3. Full frame. |
| scene/scene-mobile.webp            | 402 × 2420  | 154904 | Mobile root children, excluding Group 573, Group 574, Travel Information, Group 719. Full frame.      |
| board/board.webp                   | 1225 × 2112 | 62762  | Group 619; `115 1020 1225 2112`                                                                       |
| board/crest.webp                   | 910 × 290   | 18324  | Group 619; `270 1020 910 290`                                                                         |
| board/board-body.webp              | 1225 × 1900 | 44476  | Group 619; `115 1208 1225 1900`                                                                       |
| board/mobile/board-mobile.webp     | 378 × 1530  | 25076  | Mobile sign-base; `15 890 378 1530`                                                                   |
| panels/intro-plank.webp            | 980 × 330   | 4604   | Rectangle 1130 and Group 678/680/681/682; `240 1435 980 330`                                          |
| panels/warning-plank.webp          | 980 × 107   | 3694   | Group 710, text removed; `240 2180 980 125`, cropped to the wood face (shadow rows 107-125 dropped)   |
| paper/requirement-card.webp        | 960 × 1600  | 20420  | Rebuilt at 4× from the 240 × 400 crop of Group 702 + Group 707 nail; seal and shadow removed (below)  |
| paper/requirement-card-sm.webp     | 480 × 800   | 13364  | Same, downscaled for the mobile layout                                                                |
| paper/requirement-card-shadow.webp | 240 × 400   | 5086   | The card's original soft drop shadow (black + alpha), drawn under the card                            |
| paper/requirement-seal.svg         | vector      | 2681   | Group 575 seal traced from the 240 × 400 crop; viewBox `82 272 76 76` in card pixels                  |
| paper/map-paper.webp               | 535 × 420   | 61044  | Group 675 and nail; `240 2340 535 420`                                                                |
| ticket/international-ticket.webp   | 200 × 160   | 6364   | Ticket + Nail_3, text removed; `690 2560 200 160`                                                     |

**Requirement card rebuild (2026-11-24):** the 240 × 400 card blurred when scaled up, most visibly the wax seal. The Figma file was not accessible and no higher-resolution export was found, so the card was rebuilt from the 240 × 400 raster: the flat paper from its own silhouette (re-thresholded at 4× for a crisp torn edge), the rule line redrawn from a fitted stroke (same position, thickness and colour), and the nail lifted off the paper and upscaled. The original soft shadow ships as its own 1× layer (a soft alpha gradient is expensive in the 4× file); the card WebPs use `cwebp -q 70 -alpha_q 60 -alpha_filter best -m 6 -sharp_yuv`, the shadow is lossless. The seal was removed from the card and traced as an SVG from the same raster (outline radii, ring centre/radii, emblem rectangles and colours all sampled), placed over the card in CSS.

The ticket artwork already has approximately 23 degrees of clockwise rotation. The requirement card's text area is between its top rule and bottom wax seal. The crest includes a narrow strip of board underneath, so it can overlap the board body naturally. The full board and mobile board are used by the page. The separately extracted crest and board-body alternatives listed above were removed from the final PR because they are unused.

## Extraction and checks

A temporary Python XML script selected the named groups, recursively copied only referenced SVG definitions, and removed `<text>` elements. Large embedded scene PNGs were written beside the temporary SVG and referenced locally to avoid the SVG parser's 10 MB attribute limit. No external image requests are needed by the final WebP files.

The SVG export placed `mix-blend-mode:screen` on each cloud rectangle inside a parent opacity group. Both Sharp and Chrome rendered this with dark rectangular regions, unlike the native Figma PNG. Moving the blend mode to that same opacity group removed those regions. This is an export compatibility correction, not new artwork.

Rendered the extracted SVGs using Playwright with installed Chrome (`channel: "chrome"`), with viewports equal to each crop's dimensions and transparent screenshot background. Converted the screenshots using Sharp `webp({ quality: 88, alphaQuality: 100 })`. The requirement card was rendered with Sharp after correcting which nail group belonged to the first card. All listed outputs rendered successfully; dimensions and byte counts came from the renderer/file state. Inspected the rendered scene, mobile scene, board, crest, map paper, ticket and requirement card images.

**Known limitation:** the SVG export's noise, texture and foreground tree blur differ from Figma's native PNG export, even when rendered in Chrome. The page uses the real exported artwork, but these assets should not be described as pixel-identical to the PNG reference. The original references show the intended appearance for comparison.

To reproduce: export the same named desktop/mobile frames, select the layers and crops in the table, remove only non-decorative text, collect their referenced definitions, apply the cloud blend correction, rasterize in Chrome at the listed viewport sizes, and encode WebP with the settings above. Temporary extraction/render scripts for this session are `/tmp/extract-travel-art.py`, `/tmp/extract-travel-mobile.py`, `/tmp/prepare-travel-svg.py`, and `/tmp/render-travel-final.cjs`; they are not runtime dependencies.

## Self-hosted fonts

Downloaded latin WOFF2 files from Google Fonts CSS requested with a current Chrome user agent:

`https://fonts.googleapis.com/css2?family=Ultra&family=Manrope:wght@400;600&family=Caveat:wght@400;600&display=swap`

| Font    | Local path                  | Bytes | License/source                                                                    |
| ------- | --------------------------- | ----- | --------------------------------------------------------------------------------- |
| Ultra   | fonts/ultra/ultra.woff2     | 15248 | Apache 2.0, accompanying LICENSE.txt from google/fonts `apache/ultra/LICENSE.txt` |
| Manrope | fonts/manrope/manrope.woff2 | 24436 | OFL, accompanying OFL.txt from google/fonts `ofl/manrope/OFL.txt`                 |
| Caveat  | fonts/caveat/caveat.woff2   | 74572 | OFL, accompanying OFL.txt from google/fonts `ofl/caveat/OFL.txt`                  |

Ultra and Manrope match the Figma text families. Caveat is an explicit substitute for **Figma Hand**, which was not available as a redistributable local font. The ticket uses the site's existing Oswald font. Google Fonts CSS returned the same Manrope and Caveat latin URLs for weights 400 and 600; the files have valid WOFF2 signatures. Font axis tables were not inspected because fontTools was unavailable.

Direct font URLs:

- Ultra: `https://fonts.gstatic.com/s/ultra/v25/zOLy4prXmrtY-uT9wrKh68xE.woff2`
- Manrope: `https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSvfedN4.woff2`
- Caveat: `https://fonts.gstatic.com/s/caveat/v23/Wnz6HAc5bAfYB2Q7ZjYYiAzcPA.woff2`

No production code, rates or eligibility text changed during this asset task. Parent owns page tests and the complete HTML review report.
