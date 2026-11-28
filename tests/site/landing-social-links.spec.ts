import { expect, test } from "@playwright/test";

test("landing social link highlights align with the painted buttons", async ({
    page
}) => {
    await page.goto("/");
    const links = page
        .getByRole("navigation", { name: "HackIllinois social links" })
        .getByRole("link");
    await expect(links).toHaveCount(6);

    const art = await page
        .locator('img[src$="/bg-saloon-4.webp"]')
        .boundingBox();
    expect(art).not.toBeNull();
    const { x, y, width } = art!;
    const toArtPixels = 1440 / width;

    // The six faces in the original 1440px-wide WebP start at (338, 1636),
    // measure 98px across and repeat every 133px.
    for (const [index, link] of (await links.all()).entries()) {
        const box = await link.boundingBox();
        expect(box).not.toBeNull();
        expect((box!.x - x) * toArtPixels).toBeCloseTo(338 + index * 133, 0);
        expect((box!.y - y) * toArtPixels).toBeCloseTo(1636, 0);
        expect(box!.width * toArtPixels).toBeCloseTo(98, 0);
        expect(box!.height * toArtPixels).toBeCloseTo(98, 0);
    }
});
