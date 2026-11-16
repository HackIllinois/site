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
    for (const [name, amount] of [
        ["District of Columbia", 250],
        ["Alaska", 400]
    ]) {
        const state = page.getByRole("button", {
            name: `${name}: $${amount} reimbursement cap`,
            exact: true
        });
        await state.focus();
        await state.press("Enter");
        await expect(page.getByRole("status")).toContainText(
            `${name}: $${amount}`
        );
    }
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

test("state cap appears on the map and dismisses outside it", async ({
    page
}, testInfo) => {
    const state = page.getByRole("button", {
        name: "Illinois: $100 reimbursement cap",
        exact: true
    });
    if (testInfo.project.name === "mobile") await state.tap();
    else await state.hover();
    const label = page.getByRole("status");
    await expect(label).toContainText("Illinois: $100");
    const mapBox = await page
        .getByLabel("United States reimbursement map", { exact: true })
        .boundingBox();
    const labelBox = await label.boundingBox();
    expect(labelBox!.y).toBeLessThan(mapBox!.y + mapBox!.height);
    expect(labelBox!.y + labelBox!.height).toBeGreaterThan(mapBox!.y);
    expect(labelBox!.x).toBeGreaterThanOrEqual(mapBox!.x - 10);
    expect(labelBox!.x + labelBox!.width).toBeLessThanOrEqual(
        mapBox!.x + mapBox!.width + 10
    );
    if (testInfo.project.name === "mobile") {
        await page
            .getByRole("button", {
                name: "California: $350 reimbursement cap",
                exact: true
            })
            .tap();
        await expect(label).toContainText("California: $350");
        await page
            .getByText(
                "Hover, tap, or select a state for reimbursement rates",
                { exact: true }
            )
            .tap();
    } else {
        await page
            .getByText(
                "Hover, tap, or select a state for reimbursement rates",
                { exact: true }
            )
            .hover();
    }
    await expect(label).toBeHidden();
});

test("map takes priority over the small disclaimer without a dropdown", async ({
    page
}) => {
    await expect(page.getByRole("combobox")).toHaveCount(0);
    const map = await page
        .getByLabel("United States reimbursement map", { exact: true })
        .boundingBox();
    const policy = page.getByRole("complementary", {
        name: "Reimbursement policy"
    });
    const box = await policy.boundingBox();
    expect(box!.y).toBeGreaterThan(map!.y + map!.height);
    expect(
        await policy.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
    ).toBeLessThanOrEqual(12);
});
