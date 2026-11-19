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

test("opening stays pinned until the whole train exits, then releases and reverses", async ({
    page
}) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/travel");
    const scene = page.getByTestId("travel-scene");
    await expect(scene).toBeVisible();
    const heading = page.getByRole("heading", {
        name: "Travel Information",
        exact: true
    });
    const initialHeading = await heading.boundingBox();
    const foreground = page.locator('[data-scene-layer="foreground"]');
    const initialTree = await foreground.boundingBox();
    const branch = page.locator('[data-scene-layer="branch"]');
    const runway = await page
        .getByTestId("scene-scroll-target")
        .evaluate(el => el.getBoundingClientRect().height);
    await page.evaluate(y => scrollTo(0, y), runway * 0.5);
    await expect
        .poll(async () => (await branch.boundingBox())?.y)
        .toBeLessThan(initialTree!.y - 50);
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeGreaterThan(50);
    expect((await heading.boundingBox())!.y).toBeCloseTo(initialHeading!.y, 0);
    expect((await foreground.boundingBox())!.y).toBeCloseTo(initialTree!.y, 0);
    await page.evaluate(y => scrollTo(0, y), runway);
    const trainImage = page.locator('[data-scene-layer="train"] img');
    await expect
        .poll(async () => (await trainImage.boundingBox())!.x)
        .toBeGreaterThanOrEqual(await page.evaluate(() => innerWidth));
    expect((await heading.boundingBox())!.y).toBeCloseTo(initialHeading!.y, 0);
    await page.evaluate(y => scrollTo(0, y), runway + 150);
    await expect
        .poll(async () => (await heading.boundingBox())!.y)
        .toBeLessThan(initialHeading!.y - 140);
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBeTruthy();
    await page.evaluate(() => scrollTo(0, 0));
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeCloseTo(0, 0);
    expect((await heading.boundingBox())!.y).toBeCloseTo(initialHeading!.y, 0);
    await expect
        .poll(async () => (await branch.boundingBox())?.y)
        .toBeCloseTo(initialTree!.y, 0);
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
    for (const layer of ["train", "foreground", "branch"]) {
        await expect
            .poll(() => translation(page, layer))
            .toEqual({ x: 0, y: 0 });
    }
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => scrollTo(0, 450));
    await expect
        .poll(async () => (await translation(page, "train")).x)
        .toBeGreaterThan(0);
    await expect
        .poll(async () => (await translation(page, "branch")).y)
        .toBeLessThan(0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const layer of ["train", "branch"]) {
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

test("left parallax branch extends unclipped past its right tip", async ({
    page
}, testInfo) => {
    await page.goto("/travel");
    const branchLayer = page.locator('[data-scene-layer="branch"]');
    const branchImg = branchLayer.locator("img");
    await expect(branchImg).toBeVisible();
    const metrics = await branchLayer.evaluate(async layer => {
        const img = layer.querySelector("img") as HTMLImageElement;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const { data, width, height } = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );
        let maxX = -1;
        let maxDrop = 0;
        const colMaxAlpha = new Uint8Array(width);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const a = data[(y * width + x) * 4 + 3];
                if (a > colMaxAlpha[x]) colMaxAlpha[x] = a;
                if (a > 10 && x > maxX) maxX = x;
            }
        }
        for (let x = 1; x < width; x++) {
            const drop = colMaxAlpha[x - 1] - colMaxAlpha[x];
            if (drop > maxDrop) maxDrop = drop;
        }
        return {
            clipPath: getComputedStyle(layer).clipPath,
            width,
            maxX,
            maxDrop
        };
    });
    expect(metrics.clipPath).toBe("none");
    if (testInfo.project.name === "mobile") {
        expect(metrics.maxX / metrics.width).toBeGreaterThan(0.8);
    } else {
        expect(metrics.maxX / metrics.width).toBeGreaterThan(0.45);
    }
    expect(metrics.maxDrop).toBeLessThan(30);
});
