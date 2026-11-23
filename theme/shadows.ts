/**
 * Solid offset shadow under the white form boxes (inputs, dropdowns,
 * checkboxes, radios, upload area, review cards), matching the design mocks.
 * A translucent black reads as a darker shade of each step's background.
 */
const SHADOW_COLOR = "rgba(0, 0, 0, 0.3)";

/**
 * For boxes cut with clip-path (inputs, dropdowns, review cards): clip-path
 * hides box-shadow, so apply this as `filter` on a wrapper instead.
 */
export const BOX_SHADOW_FILTER = `drop-shadow(0 6px 0 ${SHADOW_COLOR})`;

/** For regular boxes (checkboxes, radios, upload area). */
export const BOX_SHADOW = `0 4px 0 ${SHADOW_COLOR}`;

/** Solid offset shadow under the page titles (Ultra headings). */
export const TITLE_TEXT_SHADOW = `0 4px 0 rgba(0, 0, 0, 0.35)`;

/** Hover glow layered on top of the shadow. */
export const BOX_SHADOW_HOVER = `${BOX_SHADOW}, 0 0 4px 2px #ffffff40`;
