import { expect, test } from "@playwright/test";

test("the saloon wall is continuous through the doorway and its scroll handoff", async ({
    page
}) => {
    await page.goto("/");
    const roomArt = page.locator('img[src$="/bg-saloon-1.webp"]');
    await expect(roomArt).toHaveCount(2);

    const walls = await roomArt.evaluateAll(images =>
        images.map(image => {
            const cover = getComputedStyle(image.parentElement!, "::after");
            return {
                color: cover.backgroundColor,
                height: parseFloat(cover.height),
                width: image.clientWidth
            };
        })
    );
    for (const wall of walls) {
        expect(wall.color).toBe("rgb(73, 30, 42)");
        expect(wall.height / wall.width).toBeCloseTo(120 / 1440, 3);
    }

    await page.waitForFunction(() => {
        const zoomArt = document.querySelectorAll(
            'img[src$="/bg-saloon-1.webp"]'
        )[1];
        return (
            zoomArt.getBoundingClientRect().width > zoomArt.clientWidth * 0.25
        );
    });

    await page.locator('[class*="_doorTrack__"]').evaluate(async track => {
        const scene = track.firstElementChild as HTMLElement;
        const start = window.scrollY + track.getBoundingClientRect().top;
        const pin = track.clientHeight - scene.clientHeight;
        for (const progress of [0.15, 0.42, 0.72, 0.94, 0.999]) {
            window.scrollTo({
                top: start + pin * progress,
                behavior: "instant"
            });
            await new Promise(resolve =>
                requestAnimationFrame(() => requestAnimationFrame(resolve))
            );
        }
    });

    await expect
        .poll(() =>
            roomArt.evaluateAll(([inPage, duringZoom]) => {
                const room = inPage.getBoundingClientRect();
                const zoom = duringZoom.getBoundingClientRect();
                return Math.abs(room.top - zoom.top);
            })
        )
        .toBeLessThan(3);

    const room = (await roomArt.first().boundingBox())!;
    const wide = room.width > (await page.evaluate(() => window.innerHeight));
    expect(room.y / room.width).toBeCloseTo(wide ? -0.08 : 0, 2);
});
