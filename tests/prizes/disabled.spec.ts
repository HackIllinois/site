import { expect, test } from "@playwright/test";

test("disabled prizes route shows the site 404 page", async ({ page }) => {
    const response = await page.goto("/prizes");

    expect(response?.status()).toBe(404);
    await expect(
        page.getByRole("heading", { name: "Page not found" })
    ).toBeVisible();
});

test("the navbar and homepage FAQ hide links to disabled prizes", async ({
    page
}) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav).toBeVisible();
    await expect(nav.locator('a[href="/prizes"]')).toHaveCount(0);
    await page
        .getByRole("button", { name: "What prizes will be offered this year?" })
        .click();
    await expect(
        page.getByText("Prize details will be announced later.")
    ).toBeVisible();
    await expect(page.locator('a[href="/prizes"]')).toHaveCount(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(nav).toBeVisible();
    await expect(nav.locator('a[href="/prizes"]')).toHaveCount(0);
});
