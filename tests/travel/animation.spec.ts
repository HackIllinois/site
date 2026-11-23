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

test("cactus is layered in the foreground above the train", async ({
    page
}, testInfo) => {
    await page.goto("/travel");
    const isMobile = testInfo.project.name === "mobile";
    // Center of the cactus torso in Figma artwork coordinates.
    const point = isMobile ? { x: 325, y: 615 } : { x: 1184, y: 580 };

    const result = await page.evaluate(async ({ x, y }) => {
        const backdrop = document.querySelector(
            '[data-scene-layer="backdrop"]'
        )!;
        const train = backdrop.querySelector('[data-scene-layer="train"]')!;
        const foreground = backdrop.querySelector(
            '[data-scene-layer="foreground"]'
        )!;
        const bgImg = backdrop.querySelector(
            "picture:not([data-scene-layer]) img"
        ) as HTMLImageElement;
        const fgImg = foreground.querySelector("img") as HTMLImageElement;

        const samplePixel = async (img: HTMLImageElement) => {
            await img.decode();
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;
            return { r, g, b, a };
        };

        const fgAfterTrain = Boolean(
            train.compareDocumentPosition(foreground) &
            Node.DOCUMENT_POSITION_FOLLOWING
        );

        return {
            fgAfterTrain,
            fgPixel: await samplePixel(fgImg),
            bgPixel: await samplePixel(bgImg)
        };
    }, point);

    expect(result.fgAfterTrain).toBe(true);
    // Foreground has the opaque green cactus at this coordinate.
    expect(result.fgPixel.a).toBeGreaterThan(240);
    expect(result.fgPixel.g).toBeGreaterThan(result.fgPixel.r);
    // Background has desert sand (red > green) instead of the green cactus.
    expect(result.bgPixel.r).toBeGreaterThan(result.bgPixel.g);
});
