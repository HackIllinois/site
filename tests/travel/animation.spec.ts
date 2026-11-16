import { expect, test } from "@playwright/test";

async function translation(
    page: import("@playwright/test").Page,
    layer: string
) {
    return page.locator(`[data-scene-layer="${layer}"]`).evaluate(element => {
        const matrix = new DOMMatrixReadOnly(
            getComputedStyle(element).transform
        );
        return { x: matrix.m41, y: matrix.m42 };
    });
}

test("scene follows scroll and reverses without moving the board layout", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/travel");
    const scene = page.getByTestId("travel-scene");
    await expect(scene).toBeVisible();
    await expect(scene).toHaveAttribute("aria-hidden", "true");
    await expect(scene.locator("img")).toHaveCount(3);
    for (const image of await scene.locator("img").all()) {
        await expect
            .poll(() =>
                image.evaluate(img => (img as HTMLImageElement).naturalWidth)
            )
            .toBeGreaterThan(0);
    }
    const board = page.getByRole("region", {
        name: "HackIllinois is offering travel reimbursements for qualifying attendees!"
    });
    const originalTop = await board.evaluate(
        el => el.getBoundingClientRect().top + scrollY
    );
    const start = await translation(page, "train");
    const distance = await page
        .getByTestId("scene-scroll-target")
        .evaluate(el => el.getBoundingClientRect().height * 0.45);
    await page.evaluate(y => scrollTo(0, y), distance);
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeGreaterThan(start.x + 50);
    await expect
        .poll(async () => (await translation(page, "foreground")).y)
        .toBeLessThan(-10);
    expect(
        await board.evaluate(el => el.getBoundingClientRect().top + scrollY)
    ).toBeCloseTo(originalTop, 0);
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBeTruthy();
    await page.evaluate(() => scrollTo(0, 0));
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeCloseTo(start.x, 0);
});

test("reduced motion keeps the scene still, including preference changes", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/travel");
    await expect(page.getByTestId("travel-scene")).toBeVisible();
    await page.evaluate(() => scrollTo(0, 350));
    for (const layer of ["train", "foreground"]) {
        await expect
            .poll(() => translation(page, layer))
            .toEqual({ x: 0, y: 0 });
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => scrollTo(0, 450));
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeGreaterThan(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect.poll(() => translation(page, "train")).toEqual({ x: 0, y: 0 });
});

test("scene stays visible without JavaScript", async ({
    browser,
    baseURL,
    viewport
}) => {
    const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/travel`);
    const scene = page.getByTestId("travel-scene");
    await expect(scene).toBeVisible();
    await expect(scene.locator("img")).toHaveCount(3);
    for (const image of await scene.locator("img").all()) {
        expect(
            await image.evaluate(img => (img as HTMLImageElement).naturalWidth)
        ).toBeGreaterThan(0);
    }
    await expect(
        page.getByRole("heading", { name: "Travel Information", exact: true })
    ).toBeVisible();
    await context.close();
});
