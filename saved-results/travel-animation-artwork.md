# Travel animation artwork

Date: 2026-11-15; updated 2026-11-16 (America/Detroit). Purpose: split the approved travel design into layers for the train crossing and foreground scroll motion. The parent task owns animation behavior, browser tests, and the complete HTML report.

## Result

Six WebP files now live in `public/travel/frontier/motion/`, three each in `desktop/` and `mobile/`. They total **980,780 bytes**. All use artwork from the original Figma SVG exports; no new illustration or train was invented.

Source: Figma file `9SMl0fLhpbfHbN9YFCvQjj`, desktop frame `1553:12` (1440 × 3132), mobile frame `2099:17` (402 × 2420). Local exports used: `Travel Reimbursement - Web (1).svg` and `Travel Reimbursement - Mobile.svg` in Downloads. The reference video `Comp 1_8.mp4` is available to the parent task; this artwork extraction did not measure its timing.

## Files and positioning

Paths below are relative to `public/travel/frontier/motion/`. Coordinates are original Figma frame units. The crop box is `x y width height`.

| File                    | Crop box         |  Bytes | Meaning                                                                   |
| ----------------------- | ---------------- | -----: | ------------------------------------------------------------------------- |
| desktop/background.webp | 0 0 1440 3132    | 642496 | Scenery without the train or near foreground trees                        |
| desktop/train.webp      | 332 436 683 220  |  23540 | Complete train and its attached shadow/blur                               |
| desktop/foreground.webp | 0 0 1440 3132    |  91600 | `middle tree` and `closest tree`                                          |
| mobile/background.webp  | 0 0 402 2420     | 152340 | Mobile scenery without the train or near foreground trees                 |
| mobile/train.webp       | -149 520 436 142 |  12276 | Complete mobile train, including the cars initially outside the left edge |
| mobile/foreground.webp  | 0 0 402 2420     |  30520 | `middle tree` and `middle tree_2`                                         |

Place background and foreground at the full scene bounds. Place train crops inside a wrapper with those same full scene bounds:

| Train   |         left |         top |        width |
| ------- | -----------: | ----------: | -----------: |
| Desktop |  23.0555556% | 13.9208174% |  47.4305556% |
| Mobile  | -37.0646766% | 21.4876033% | 108.4577114% |

Use each train image's natural aspect ratio. Move the full scene wrapper horizontally to keep travel distance measured against the scene width, rather than the train image width. The mobile image extends outside the scene initially; clip the overall scene, not the train crop itself. A 402-pixel-wide mobile train export would permanently cut off the left cars when they later move into view.

Layer order is background, train, foreground. The existing board and content remain separate. The source train is four red wagons on desktop and three on mobile, with no visible locomotive establishing a forward direction. Left-to-right movement comes from the requested behavior rather than a claimed locomotive orientation.

## Exact source layers

Both train outputs use the original `train` group, including its existing shadow child `Vector 207` and outer filter. Desktop filter `filter7_f_1553_12` reaches `x332 y436 width682.5 height220`; mobile filter `filter8_f_2099_17` reaches `x-149 y520 width435.999 height141.527`. Crop dimensions were rounded outward to whole pixels, not cut to the visible wagon body.

Desktop background keeps all root children except:

- Non-scenery: `menu bar`, `Travel Information`, `Group 711`, `Ticket`, `Nail_3`.
- Separate motion layers: `train`, `middle tree`, `closest tree`.

Mobile background keeps all root children except:

- Non-scenery: `Group 573`, `Group 574`, `Travel Information`, `Group 719`.
- Separate motion layers: `train`, `middle tree`, `middle tree_2`.

The station, railway, distant trees, bushes, and scenery shading stay in the backgrounds. No policy text, amounts, map, board, or eligibility content appears in these layers.

## Method and checks

1. Parsed the named Figma SVG groups with Python XML tools; copied only selected groups and their referenced definitions.
2. Wrote embedded bitmap data beside temporary SVG files to avoid the SVG parser's large-attribute limit.
3. Preserved the existing static asset export correction: move each cloud rectangle's `mix-blend-mode:screen` to its parent opacity group. This prevents dark rectangular cloud regions caused by the exported grouping.
4. Rendered temporary SVGs through Playwright using installed Chrome (`channel: "chrome"`), at the crop dimensions, with transparent screenshot backgrounds.
5. Encoded WebP using Sharp `webp({ quality: 88, alphaQuality: 100 })`.
6. Reconstructed the original, unmoved scene by compositing background, the positioned train crop, and foreground. Inspected the desktop reconstruction and the complete mobile train. The reconstruction preserves the static scene within expected separate-image encoding differences.

Commands run and results:

- `python3 /tmp/extract-travel-motion.py`: exit 0, extracted named layers and source coordinates.
- `node /tmp/inspect-motion-bounds.cjs`: exit 0; browser geometry bounds desktop `(334,438,678.5,216)`, mobile `(-147,522,431.999,137.527)`. Outer blur-filter bounds were then used for complete crops.
- `node /tmp/render-travel-motion.cjs`: exit 0, rendered backgrounds and foregrounds. Initial full-frame trains were temporary and are not delivered.
- `node /tmp/render-travel-motion-trains.cjs`: exit 0, rendered the final complete train crops.
- `node /tmp/check-motion-composition.cjs`: exit 0. Against the existing static WebP, mean RGB channel difference was **1.4125 / 255 desktop** and **1.3255 / 255 mobile**; channels differing by more than 20 were **0.0209% desktop** and **0.0488% mobile**. This was a composition sanity check before the right-tree correction below, not proof of pixel-identical reproduction. The corrected branch intentionally differs from that old sharp static export.

## Limits and reuse

The original SVG export already differs from Figma's native PNG in some texture and tree-blur rendering; the earlier static artwork provenance records that limitation. These layers use the same export and correction, so the limitation carries forward. Separate lossy WebP encoding introduces small additional pixel differences around edges.

No animation timing, reduced-motion behavior, layout, or user interaction was implemented or tested by this artwork task. Those checks belong to the parent implementation. Unit tests were skipped because this task produces static image assets, not executable product logic; renderer success, dimensions, visible inspection and composition checks are the relevant evidence.

To recreate the assets, export the named frames with layer IDs retained, select the groups listed above, gather their referenced definitions, apply the existing cloud blend correction, and render at the table's crop boxes with the stated encoder settings. The temporary extraction/render commands above remain available for this session; they are not runtime dependencies or committed source assets.

## 2026-11-16 correction: right-tree blur

The user reported that the right tree looked detached and sharp compared with the supplied reference. The parent task handles scene pinning and removes the separate foreground movement. This artwork correction changes only the right main branch's exported blur in the two motion foreground files.

**Verified cause in source:** desktop `filter181_gf_1553_12`, attached to `Rectangle 70_2` inside `middle tree`, contains `feGaussianBlur stdDeviation="0"`. Mobile `filter18_gf_2099_17`, attached to `Rectangle 70` inside `middle tree`, also contains zero blur. In contrast, nearby right-tree branch filters contain blur values 5–6 and its foliage filter contains 7.5. Desktop left-tree main filter `filter189_gf_1553_12` already contains 15. The native desktop PNG export and the user-supplied reference visibly blur the right upper branches; the SVG's zero value does not reproduce that appearance.

**Correction:** changed only the two named right main-branch filters from 0 to 10 in temporary SVG copies, then regenerated the original full-frame WebP foreground files with the same Chrome renderer and WebP settings. The value **10 is a visual-match estimate**, not a claimed recovery of the Figma setting. The lower trunk/base and other original blur values remain unchanged. No blanket blur was applied to the full foreground, and the left tree was not blurred again.

Focused checks and results:

- `python3 /tmp/correct-travel-right-tree.py`: exit 0, produced temporary corrected SVGs.
- `node /tmp/render-travel-right-tree.cjs`: exit 0, rendered desktop 1440 × 3132 and mobile 402 × 2420.
- Reference inspection: viewed matching crops of `Travel Reimbursement - Web.png` and the corrected desktop composition, plus the corrected mobile scene. The former jagged upper branch now has a soft edge; its position and geometry remain unchanged. A background-only composition was used for the crop comparison, so omitted train/title text is intentional in those temporary check images.
- `node /tmp/check-travel-right-tree.cjs`: initial temporary image check failed because Sharp applied a crop before composition; corrected the check to composite before cropping and reran successfully, exit 0. This did not change product assets.
- Exact XML assertions passed for both modes: root dimensions match the prior export; the left-tree subtree is byte-for-byte identical; resetting the single changed blur value to zero makes the entire corrected SVG equal to its original. This proves no geometry, transform, other filter, or left-tree artwork changed in the source used for rendering.
- Files changed: desktop foreground 91,600 → 113,292 bytes; mobile foreground 30,520 → 36,836 bytes. Other motion assets were not modified.

SHA-256 of final foreground files:

- Desktop: `5907937f2b67df264f18cb8b9545299b4d599fac8745d2431c5a1360a4cea50f`
- Mobile: `140429470ca9de02957559ac235fec3f145e73e1a849284139ddccaa006449ba`

Remaining limitation: the chosen blur is visually fitted to the native reference; exact Figma rendering equivalence is not claimed. Texture differences documented earlier remain. This asset task did not change or test TS/SCSS, pinning, scroll timing, or reduced-motion behavior; the parent implementation owns those checks.
