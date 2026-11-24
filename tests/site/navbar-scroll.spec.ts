import { expect, test } from "@playwright/test";

// Ticket 51: the navbar must not shift when the page scrolls. The landing
// page's desktop bar always sits 20px higher (the old scrolled position);
// other pages, and every page at phone width, keep the bar at rest.
for (const path of ["/", "/job-board"]) {
    test(`navbar stays put on scroll at ${path}`, async ({ page }) => {
        await page.goto(path);
        const logo = page.locator("header img").first();
        await expect(logo).toBeVisible();

        const layout = await page.evaluate(() => {
            const header = document.querySelector("header")!;
            const bar = header.firstElementChild!;
            const h = header.getBoundingClientRect();
            const b = bar.getBoundingClientRect();
            return {
                lift: b.top - h.top,
                headerHeight: h.height,
                barHeight: b.height,
                narrow: window.innerWidth <= 850
            };
        });
        const lifted = path === "/" && !layout.narrow;
        expect(layout.lift).toBe(lifted ? -20 : 0);
        // The lift moves the bar only; the backdrop keeps its full height.
        expect(layout.headerHeight).toBe(layout.barHeight);

        const before = await logo.boundingBox();
        await page.mouse.wheel(0, 600);
        await page.waitForFunction(() => window.scrollY > 4);
        // Outlast any transition that might have been left on the bar.
        await page.waitForTimeout(400);
        const after = await logo.boundingBox();

        expect(after?.y).toBe(before?.y);
    });
}
