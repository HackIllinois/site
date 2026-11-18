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

async function top(locator: import("@playwright/test").Locator) {
    return (await locator.boundingBox())!.y;
}

test("train crosses once from left to right on page load, without scroll", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/travel");
    const trainImage = page.locator('[data-scene-layer="train"] img');
    const viewportWidth = await page.evaluate(() => innerWidth);
    // It enters from the left edge.
    await expect
        .poll(async () => (await trainImage.boundingBox())!.x, {
            timeout: 3000
        })
        .toBeGreaterThan(-(await trainImage.boundingBox())!.width);
    const early = (await trainImage.boundingBox())!.x;
    expect(early).toBeLessThan(viewportWidth / 2);
    // It leaves on the right edge with no scroll.
    await expect
        .poll(async () => (await trainImage.boundingBox())!.x, {
            timeout: 8000
        })
        .toBeGreaterThanOrEqual(viewportWidth);
    expect(await page.evaluate(() => scrollY)).toBe(0);
    // It does not come back.
    await page.waitForTimeout(500);
    expect((await trainImage.boundingBox())!.x).toBeGreaterThanOrEqual(
        viewportWidth
    );
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBeTruthy();
});

test("layers scroll at reference speeds from the top, then reverse", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/travel");
    await expect(page.getByTestId("travel-scene")).toBeVisible();
    const layers = {
        title: page.getByRole("heading", {
            name: "Travel Information",
            exact: true
        }),
        board: page.getByRole("heading", {
            name: /offering travel reimbursements/
        }),
        backdrop: page.locator('[data-scene-layer="backdrop"]'),
        tree: page.locator('[data-scene-layer="foreground"]'),
        branch: page.locator('[data-scene-layer="branch"]')
    };
    const start: Record<string, number> = {};
    for (const [name, locator] of Object.entries(layers)) {
        start[name] = await top(locator);
    }
    // Board 1x page speed, scene 0.5x, branch 2x. No pinned hold.
    const distance = 300;
    const speed = { title: 0.5, board: 1, backdrop: 0.5, tree: 0.5, branch: 2 };
    await page.evaluate(y => scrollTo(0, y), distance);
    for (const [name, locator] of Object.entries(layers)) {
        await expect
            .poll(() => top(locator), name)
            .toBeCloseTo(
                start[name] - distance * speed[name as keyof typeof speed],
                0
            );
    }
    await page.evaluate(() => scrollTo(0, 0));
    for (const [name, locator] of Object.entries(layers)) {
        await expect.poll(() => top(locator), name).toBeCloseTo(start[name], 0);
    }
});

test("reduced motion keeps the scene still, including preference changes", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/travel");
    await expect(page.getByTestId("travel-scene")).toBeVisible();
    const heading = page.getByRole("heading", {
        name: "Travel Information",
        exact: true
    });
    const initialY = await top(heading);
    await page.waitForTimeout(600);
    await page.evaluate(() => scrollTo(0, 350));
    expect(await top(heading)).toBeCloseTo(initialY - 350, 0);
    for (const layer of ["backdrop", "train", "branch"]) {
        await expect
            .poll(() => translation(page, layer))
            .toEqual({ x: 0, y: 0 });
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => scrollTo(0, 400));
    await expect
        .poll(async () => (await translation(page, "backdrop")).y)
        .toBeGreaterThan(0);
    await expect
        .poll(async () => (await translation(page, "branch")).y)
        .toBeLessThan(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const layer of ["backdrop", "train", "branch"]) {
        await expect
            .poll(() => translation(page, layer))
            .toEqual({ x: 0, y: 0 });
    }
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
    await expect(scene.locator("img")).toHaveCount(4);
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
