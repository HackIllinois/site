import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test.beforeEach(async ({ page }) => {
    await page.goto("/travel");
});

test("the site navbar stays at the top past the travel scene", async ({
    page
}) => {
    const navbar = page.getByRole("banner");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(500);
    await expect(navbar).toHaveCount(1);
    expect(await navbar.evaluate(el => el.getBoundingClientRect().top)).toBe(0);
    if (await page.getByRole("button", { name: "Open menu" }).isVisible()) {
        await page.getByRole("button", { name: "Open menu" }).click();
    }
    await expect(navbar.getByRole("link", { name: "Schedule" })).toHaveCount(0);
    await navbar.getByRole("link", { name: "Prizes" }).click();
    await expect(page).toHaveURL(/\/prizes$/);
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
    ).toBe(14);
});

test("every state uses its reimbursement tier color and shows a hover popup with highlight and dimming", async ({
    page
}, testInfo) => {
    const map = page.getByLabel("United States reimbursement map", {
        exact: true
    });
    const states = map.locator("path[aria-label]");
    await expect(states).toHaveCount(51);
    const legend = page.getByRole("list", { name: "Reimbursement tiers" });
    const colors = new Set<string>();
    for (const item of await legend.getByRole("listitem").all()) {
        const amount = (await item.innerText()).trim();
        const color = await item
            .locator("span")
            .evaluate(el => getComputedStyle(el).backgroundColor);
        colors.add(color);
        const matching = states;
        for (const state of await matching.all()) {
            if (
                (await state.getAttribute("aria-label"))!.includes(
                    `${amount} reimbursement`
                )
            ) {
                expect(
                    await state.evaluate(el => getComputedStyle(el).fill)
                ).toBe(color);
            }
        }
    }
    expect(colors.size).toBe(8);

    // Legend padding on the right matches the left with no trailing dead space.
    const legendMetrics = await legend.evaluate(el => {
        const style = getComputedStyle(el);
        const items = Array.from(el.querySelectorAll("li"));
        const maxRight = Math.max(
            ...items.map(item => item.offsetLeft + item.offsetWidth)
        );
        return {
            paddingLeft: parseFloat(style.paddingLeft),
            paddingRight: parseFloat(style.paddingRight),
            trailingSpace: el.clientWidth - maxRight
        };
    });
    expect(legendMetrics.paddingRight).toBeCloseTo(
        legendMetrics.paddingLeft,
        1
    );
    expect(
        Math.abs(legendMetrics.trailingSpace - legendMetrics.paddingRight)
    ).toBeLessThanOrEqual(4);

    const illinois = page.getByLabel("Illinois: $100 reimbursement cap", {
        exact: true
    });
    const california = page.getByLabel("California: $350 reimbursement cap", {
        exact: true
    });
    const beforeFill = await illinois.evaluate(el => getComputedStyle(el).fill);
    const beforeStroke = await illinois.evaluate(el =>
        parseFloat(getComputedStyle(el).strokeWidth)
    );
    if (testInfo.project.name === "mobile") await illinois.tap();
    else await illinois.hover();

    const tooltip = page.getByRole("tooltip");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText("Illinois");
    await expect(tooltip).toContainText("$100");
    await expect(tooltip).toContainText("reimbursement cap");
    expect(await illinois.evaluate(el => getComputedStyle(el).fill)).toBe(
        beforeFill
    );
    await expect
        .poll(() =>
            illinois.evaluate(el =>
                parseFloat(getComputedStyle(el).strokeWidth)
            )
        )
        .toBeGreaterThan(beforeStroke);
    await expect
        .poll(() =>
            california.evaluate(el => parseFloat(getComputedStyle(el).opacity))
        )
        .toBeLessThan(1);

    await page.keyboard.press("Escape");
    await expect(tooltip).toHaveCount(0);
});

test("local reimbursement JSON covers every state once in the eight allowed tiers", async ({
    page
}) => {
    const groups = JSON.parse(
        readFileSync(
            join(
                process.cwd(),
                "app/travel/reimbursement-data/state-rates.json"
            ),
            "utf8"
        )
    ) as Record<string, string[]>;
    expect(Object.keys(groups).sort((a, b) => Number(a) - Number(b))).toEqual([
        "100",
        "150",
        "200",
        "250",
        "275",
        "300",
        "350",
        "400"
    ]);
    const atlas = JSON.parse(
        readFileSync(join(process.cwd(), "public/us-atlas.json"), "utf8")
    );
    const expected = atlas.objects.states.geometries
        .filter((state: { id: string }) => Number(state.id) <= 56)
        .map((state: { properties: { name: string } }) => state.properties.name)
        .sort();
    const listed = Object.values(groups).flat();
    expect(listed.length).toBe(51);
    expect(new Set(listed).size).toBe(51);
    expect([...listed].sort()).toEqual(expected);
    for (const [amount, states] of Object.entries(groups)) {
        for (const state of states) {
            await expect(
                page.getByLabel(`${state}: $${amount} reimbursement cap`, {
                    exact: true
                })
            ).toBeVisible();
        }
    }
});
