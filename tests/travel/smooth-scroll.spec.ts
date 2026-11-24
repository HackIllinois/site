import { expect, test, type Page } from "@playwright/test";

// Records scrollY and the branch layer's translation on every frame.
async function record(page: Page) {
    await page.evaluate(() => {
        const branch = document.querySelector('[data-scene-layer="branch"]')!;
        const frames: { y: number; branch: number }[] = [];
        (window as unknown as { frames_: typeof frames }).frames_ = frames;
        const tick = () => {
            frames.push({
                y: scrollY,
                branch: new DOMMatrixReadOnly(
                    getComputedStyle(branch).transform
                ).m42
            });
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

async function recorded(page: Page) {
    return page.evaluate(
        () =>
            (
                window as unknown as {
                    frames_: { y: number; branch: number }[];
                }
            ).frames_
    );
}

const scrollTop = (page: Page) => page.evaluate(() => scrollY);
const bottom = (page: Page) =>
    page.evaluate(() => document.documentElement.scrollHeight - innerHeight);

test.describe("mouse and trackpad", () => {
    test.skip(({ isMobile }) => isMobile, "Touch keeps native scrolling.");

    test.beforeEach(async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.goto("/travel");
        await expect(page.getByTestId("travel-scene")).toBeVisible();
        await page.mouse.move(400, 400);
    });

    test("a wheel tick glides over several frames with the layers in step", async ({
        page
    }) => {
        await record(page);
        await page.mouse.wheel(0, 100);
        await expect.poll(() => scrollTop(page)).toBe(100);
        const moving = (await recorded(page)).filter(
            (frame, i, all) => i > 0 && frame.y !== all[i - 1].y
        );
        // Natively, the whole tick lands in one frame.
        expect(moving.length).toBeGreaterThan(4);
        for (const frame of moving) {
            // Branch moves at 2x: translated up by exactly the scroll distance.
            expect(frame.branch).toBeCloseTo(-frame.y, 0);
        }
    });

    test("keyboard and native jumps win over an unfinished glide", async ({
        page
    }) => {
        await page.mouse.wheel(0, 800);
        await page.keyboard.press("End");
        await expect
            .poll(async () => (await bottom(page)) - (await scrollTop(page)))
            .toBeLessThan(2);

        await page.keyboard.press("Home");
        await expect.poll(() => scrollTop(page)).toBe(0);
        await page.mouse.wheel(0, 800);
        await page.evaluate(() => scrollTo({ top: 2000, behavior: "instant" }));
        await page.waitForTimeout(1000);
        expect(await scrollTop(page)).toBeCloseTo(2000, 0);
    });

    test("leaves zoom, sideways and history wheel gestures to the browser", async ({
        page
    }) => {
        const prevented = await page.evaluate(() =>
            [
                { deltaY: 0.25, ctrlKey: true },
                { deltaX: 80, deltaY: 0 },
                { deltaY: 100, altKey: true }
            ].map(init => {
                const event = new WheelEvent("wheel", {
                    ...init,
                    bubbles: true,
                    cancelable: true
                });
                document.body.dispatchEvent(event);
                return event.defaultPrevented;
            })
        );
        expect(prevented).toEqual([false, false, false]);
    });

    test("reduced motion keeps native wheel scrolling", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await expect(page.locator("html")).not.toHaveClass(/lenis/);
        await page.mouse.wheel(0, 300);
        await expect.poll(() => scrollTop(page)).toBe(300);
    });
});

test("touch devices keep native scrolling", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Phone layout only.");
    await page.goto("/travel");
    await expect(page.getByTestId("travel-scene")).toBeVisible();
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
});
