import { expect, test, type Locator, type Page } from "@playwright/test";

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

async function expectBelowHeader(page: Page, section: Locator) {
    await expect
        .poll(async () => {
            const target = await section.boundingBox();
            const header = await page.locator("header").first().boundingBox();
            return Boolean(
                target &&
                header &&
                target.y >= header.y + header.height - 1 &&
                target.y < header.y + header.height + 65
            );
        })
        .toBe(true);
}

test("landing links scroll to each section and underline it only while visible", async ({
    page,
    isMobile
}) => {
    await page.goto("/");
    const nav = page.locator("#frontier-nav");
    const menu = page.getByRole("button", { name: /menu$/ });
    const current = nav.locator('[aria-current="location"]');

    await expect(current).toHaveCount(0);
    for (const [name, id] of [
        ["Sponsors", "sponsors"],
        ["FAQ", "faq"]
    ]) {
        if (isMobile) await menu.click();
        const link = nav.locator(`a[href="/#${id}"]`);
        await expect(link).toHaveAccessibleName(name);
        if (isMobile) await link.tap();
        else await link.press("Enter");
        await expect(page).toHaveURL(new RegExp(`/#${id}$`));
        if (isMobile)
            await expect(menu).toHaveAttribute("aria-expanded", "false");
        const section = page.getByRole("region", { name, exact: true });
        await expect(section).toBeFocused();
        await expectBelowHeader(page, section);
        if (isMobile) await menu.click();
        await expect(link).toHaveAttribute("aria-current", "location");
        await expect(link).toHaveCSS("text-decoration-line", "underline");

        await section.evaluate(node =>
            window.scrollBy(0, node.getBoundingClientRect().bottom + 10)
        );
        await expect(link).not.toHaveAttribute("aria-current", "location");
        await expect(link).toHaveCSS("text-decoration-line", "none");
        if (isMobile) await menu.click();
    }
    await expect(current).toHaveCount(0);
});

test("landing links work from other routes and synchronize on direct visits", async ({
    page,
    isMobile
}) => {
    if (isMobile) await page.setViewportSize({ width: 390, height: 240 });
    await page.goto("/job-board");
    const nav = page.locator("#frontier-nav");
    if (isMobile) {
        await page.getByRole("button", { name: "Open menu" }).click();
        await expect(nav).toBeInViewport({ ratio: 1 });
    }
    await expect(
        nav.getByRole("link", { name: "Job Board", exact: true })
    ).toHaveAttribute("aria-current", "page");
    const faq = nav.locator('a[href="/#faq"]');
    await faq.click();
    await expect(page).toHaveURL(/\/#faq$/);
    await expect(faq).toHaveAttribute("aria-current", "location");
    const faqSection = page.getByRole("region", { name: "FAQ", exact: true });
    await expect(faqSection).toBeFocused();
    await expectBelowHeader(page, faqSection);

    const direct = await page.context().newPage();
    await direct.goto("/#sponsors");
    const sponsors = direct.getByRole("region", {
        name: "Sponsors",
        exact: true
    });
    await expectBelowHeader(direct, sponsors);
    await expect(
        direct.locator('#frontier-nav a[href="/#sponsors"]')
    ).toHaveAttribute("aria-current", "location");
});
