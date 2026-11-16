import { test, expect } from "@playwright/test";

for (const width of [1440, 390, 320]) {
    test(`prize page and section links work at ${width}px`, async ({
        page
    }) => {
        await page.setViewportSize({ width, height: 900 });
        const errors: string[] = [];
        page.on("pageerror", error => errors.push(error.message));
        await page.goto("/prizes");
        await expect(
            page.getByRole("heading", { name: "Prizes", exact: true })
        ).toBeVisible();
        await expect(page.getByText(/sample prize information/i)).toBeVisible();
        const navigation = page.getByRole("navigation", {
            name: "Prize sections"
        });
        await expect(navigation).toBeVisible();
        for (const name of ["Path", "Track", "Company", "Extra"]) {
            await navigation.getByRole("link", { name, exact: true }).click();
            await expect(page).toHaveURL(
                new RegExp(`#${name.toLowerCase()}-prizes$`)
            );
            await expect(
                page.getByRole("heading", {
                    name: `${name} Prizes`,
                    exact: true
                })
            ).toBeInViewport();
        }
        await expect(page.locator("main article")).toHaveCount(14);
        expect(
            await page.evaluate(
                () => document.documentElement.scrollWidth <= window.innerWidth
            )
        ).toBe(true);
        expect(
            await page
                .locator("main img")
                .evaluateAll(images =>
                    images.every(
                        image =>
                            (image as HTMLImageElement).complete &&
                            (image as HTMLImageElement).naturalWidth > 0
                    )
                )
        ).toBe(true);
        expect(errors).toEqual([]);
    });
}

test("section signpost works with keyboard and page has no decorative animation", async ({
    page
}) => {
    await page.goto("/prizes");
    const link = page
        .getByRole("navigation", { name: "Prize sections" })
        .getByRole("link", { name: "Track", exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#track-prizes$/);
    await expect(
        page.getByRole("heading", { name: "Track Prizes", exact: true })
    ).toBeInViewport();
    const animations = await page
        .locator("main")
        .evaluate(root => root.getAnimations({ subtree: true }).length);
    expect(animations).toBe(0);
});

test("phone section links respond to touch", async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true
    });
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3018/prizes");
    await page
        .getByRole("navigation", { name: "Prize sections" })
        .getByRole("link", { name: "Company", exact: true })
        .tap();
    await expect(page).toHaveURL(/#company-prizes$/);
    await expect(
        page.getByRole("heading", { name: "Company Prizes", exact: true })
    ).toBeInViewport();
    await context.close();
});
