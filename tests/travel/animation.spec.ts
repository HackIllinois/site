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

test("opening holds for the train, then layers scroll at reference speeds and reverse", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/travel");
    await expect(page.getByTestId("travel-scene")).toBeVisible();
    const title = page.getByRole("heading", {
        name: "Travel Information",
        exact: true
    });
    const board = page.getByRole("heading", {
        name: /offering travel reimbursements/
    });
    const backdrop = page.locator('[data-scene-layer="backdrop"]');
    const tree = page.locator('[data-scene-layer="foreground"]');
    const branch = page.locator('[data-scene-layer="branch"]');
    const trainImage = page.locator('[data-scene-layer="train"] img');
    const hold = await page
        .getByTestId("scene-hold")
        .evaluate(el => el.getBoundingClientRect().height);
    const start = {
        title: await top(title),
        board: await top(board),
        backdrop: await top(backdrop),
        tree: await top(tree),
        branch: await top(branch)
    };
    const trainStart = (await trainImage.boundingBox())!.x;

    // Hold: only the train moves.
    await page.evaluate(y => scrollTo(0, y), hold * 0.5);
    await expect
        .poll(async () => (await trainImage.boundingBox())!.x)
        .toBeGreaterThan(trainStart + 20);
    for (const [name, locator] of Object.entries({
        title,
        board,
        backdrop,
        tree,
        branch
    })) {
        expect(await top(locator), name).toBeCloseTo(
            start[name as keyof typeof start],
            0
        );
    }

    // After the hold: board 1x, scene 0.5x, branch 2x. Train still crossing.
    const drift = 200;
    await page.evaluate(y => scrollTo(0, y), hold + drift);
    await expect.poll(() => top(board)).toBeCloseTo(start.board - drift, 0);
    await expect
        .poll(() => top(branch))
        .toBeCloseTo(start.branch - 2 * drift, 0);
    for (const [name, locator] of Object.entries({ title, backdrop, tree })) {
        expect(await top(locator), name).toBeCloseTo(
            start[name as keyof typeof start] - drift / 2,
            0
        );
    }
    const viewportWidth = await page.evaluate(() => innerWidth);
    expect((await trainImage.boundingBox())!.x).toBeLessThan(viewportWidth);

    // The train leaves the screen before the crossing ends.
    const crossing = await page
        .getByTestId("scene-scroll-target")
        .evaluate(el => el.getBoundingClientRect().height);
    await page.evaluate(y => scrollTo(0, y), crossing);
    await expect
        .poll(async () => (await trainImage.boundingBox())!.x)
        .toBeGreaterThanOrEqual(viewportWidth);
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBeTruthy();

    // Scrolling back restores every layer.
    await page.evaluate(() => scrollTo(0, 0));
    await expect
        .poll(async () => (await trainImage.boundingBox())!.x)
        .toBeCloseTo(trainStart, 0);
    for (const [name, locator] of Object.entries({
        title,
        board,
        backdrop,
        tree,
        branch
    })) {
        await expect
            .poll(() => top(locator), name)
            .toBeCloseTo(start[name as keyof typeof start], 0);
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
    const initialY = (await heading.boundingBox())!.y;
    await page.evaluate(() => scrollTo(0, 350));
    expect((await heading.boundingBox())!.y).toBeCloseTo(initialY - 350, 0);
    for (const layer of ["backdrop", "train", "branch"]) {
        await expect
            .poll(() => translation(page, layer))
            .toEqual({ x: 0, y: 0 });
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => scrollTo(0, 900));
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeGreaterThan(0);
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
