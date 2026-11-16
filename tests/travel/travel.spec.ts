import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.goto("/travel");
});

test("travel policy stays readable in the new layout", async ({ page }) => {
    await expect(
        page.getByRole("heading", { name: "Travel Information", exact: true })
    ).toBeVisible();
    await expect(
        page.getByText('RSVP "Yes" to attend HackIllinois', { exact: true })
    ).toBeVisible();
    await expect(
        page.getByText("Attend HackIllinois in person", { exact: true })
    ).toBeVisible();
    await expect(
        page.getByText("Submit a qualifying project", { exact: true })
    ).toBeVisible();
    await expect(page.getByText(/Participants must opt in/)).toBeVisible();
    await expect(page.getByText(/not guaranteed/)).toBeVisible();
    await expect(
        page.getByRole("link", { name: "contact@hackillinois.org" })
    ).toHaveAttribute("href", "mailto:contact@hackillinois.org");
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBeTruthy();
    await expect(page).toHaveTitle(/Travel.*HackIllinois/);
});

test("state rates work by keyboard and selection, including DC", async ({
    page
}) => {
    const california = page.getByRole("button", {
        name: "California: $350 reimbursement cap",
        exact: true
    });
    await california.focus();
    await expect(page.getByRole("status")).toContainText("California: $350");
    await california.press("Enter");
    await page
        .getByLabel("Choose a state or district")
        .selectOption("District of Columbia");
    await expect(page.getByRole("status")).toContainText(
        "District of Columbia: $250"
    );
    await page.getByLabel("Choose a state or district").selectOption("Alaska");
    await expect(page.getByRole("status")).toContainText("Alaska: $400");
});

test("map supports pointer or touch selection", async ({ page }, testInfo) => {
    const illinois = page.getByRole("button", {
        name: "Illinois: $100 reimbursement cap",
        exact: true
    });
    if (testInfo.project.name === "mobile") await illinois.tap();
    else await illinois.hover();
    await expect(page.getByRole("status")).toContainText("Illinois: $100");
});

test("ticket exposes existing international caps and closes with Escape", async ({
    page
}) => {
    const ticket = page.getByRole("button", {
        name: "International reimbursement rates",
        exact: true
    });
    await ticket.click();
    const panel = page.getByRole("region", {
        name: "International reimbursement rates"
    });
    await expect(panel).toBeVisible();
    await expect(panel).toContainText("Waterloo (Canada)");
    await expect(panel).toContainText("$350");
    for (const location of ["Singapore", "China", "India", "UK"]) {
        await expect(panel.getByText(location, { exact: true })).toBeVisible();
    }
    await expect(panel).toContainText("$500");
    await expect(panel).toContainText("Not listed");
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(ticket).toBeFocused();
});

test("small screens and dark appearance retain working navigation", async ({
    page
}) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await expect(
        page
            .getByRole("navigation", { name: "Main navigation" })
            .getByRole("link", { name: "Travel", exact: true })
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
        page.getByRole("button", { name: "Open menu", exact: true })
    ).toBeVisible();
    expect(
        await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
        )
    ).toBeTruthy();
    await page
        .getByRole("button", {
            name: "International reimbursement rates",
            exact: true
        })
        .click();
    const box = await page
        .getByRole("region", { name: "International reimbursement rates" })
        .boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
});
