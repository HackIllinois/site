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

    await page.evaluate(() => {
        const track = document.querySelector<HTMLElement>(
            '[class*="_doorTrack__"]'
        )!;
        const scene = track.firstElementChild as HTMLElement;
        window.scrollTo({
            top:
                window.scrollY +
                track.getBoundingClientRect().bottom -
                scene.offsetHeight -
                1,
            behavior: "instant"
        });
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
