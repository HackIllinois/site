import { expect, test } from "@playwright/test";

test("the desktop window casts the same shadow as the page scrolls underneath", async ({
    page
}) => {
    await page.goto("/challenge");
    const hero = page.getByRole("heading", { level: 1 });
    await expect(hero).toBeInViewport();

    // A white strip isolates the painted shadow from the changing section artwork.
    await page.evaluate(() => {
        const strip = document.createElement("div");
        strip.id = "shadow-sample";
        strip.style.cssText =
            "position:fixed;left:32px;right:32px;top:320px;height:32px;background:white;pointer-events:none;z-index:2147483647";
        document.body.append(strip);
    });
    const strip = page.locator("#shadow-sample");
    const white = await strip.screenshot();
    await strip.evaluate(el => (el.style.zIndex = "10"));
    await expect
        .poll(async () => (await strip.screenshot()).equals(white))
        .toBe(false);
    const shaded = await strip.screenshot();

    await page.getByRole("link", { name: "HackIllinois Pro-Track" }).click();
    await expect(
        page.getByRole("heading", { name: "What is HackOutlaws?" })
    ).toBeInViewport();
    await expect(hero).not.toBeInViewport();
    expect((await strip.screenshot()).equals(shaded)).toBe(true);

    await page.evaluate(() =>
        window.scrollTo(0, document.documentElement.scrollHeight)
    );
    await expect
        .poll(() =>
            page.evaluate(() =>
                Math.abs(
                    document.documentElement.scrollHeight -
                        window.innerHeight -
                        window.scrollY
                )
            )
        )
        .toBeLessThan(2);
    expect((await strip.screenshot()).equals(shaded)).toBe(true);
});
