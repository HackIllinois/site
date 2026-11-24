import { expect, test } from "@playwright/test";

test("keeps a passing report visible, unlocks the next download and resumes on refresh", async ({
    page,
    baseURL
}) => {
    await page
        .context()
        .addCookies([{ name: "jwt", value: "test-session", url: baseURL! }]);
    let passed = 0;
    function status() {
        const tiers = [1, 2, 3].map(tier => {
            const done = tier <= passed;
            const instanceId = `tier${tier}-sample`;
            return {
                tier,
                instanceId,
                passed: done,
                unlocked: tier <= passed + 1,
                bestScore: done ? 300 : 0,
                normalizedScore: done ? 1 : 0,
                attempts: done ? 1 : 0,
                lastReport: done
                    ? {
                          instance: instanceId,
                          score: 300,
                          completed: 3,
                          totalOrders: 3,
                          onTime: 3,
                          lateMinutes: 0,
                          travelMinutes: 20,
                          errors: []
                      }
                    : null
            };
        });
        return {
            ...tiers[0],
            tiers,
            complete: passed >= 2,
            passRatio: 0.6,
            overallScore: passed / 3
        };
    }
    await page.route(
        /\/auth\/token$|\/registration(?:$|\/status\/$|\/challenge\/)/,
        async route => {
            const path = new URL(route.request().url()).pathname;
            const headers = {
                "Access-Control-Allow-Origin": new URL(baseURL!).origin,
                "Access-Control-Allow-Credentials": "true"
            };
            if (path === "/auth/token")
                return route.fulfill({
                    headers,
                    json: { jwt: "test-session" }
                });
            if (path === "/registration")
                return route.fulfill({ headers, json: { pro: true } });
            if (path === "/registration/status/")
                return route.fulfill({ headers, json: { alive: true } });
            if (path === "/registration/challenge/world/2/")
                return route.fulfill({
                    headers,
                    json: { instance: "tier2-sample" }
                });
            if (route.request().method() === "POST") {
                expect(path).toBe(`/registration/challenge/${passed + 1}/`);
                passed++;
            } else expect(path).toBe("/registration/challenge/");
            return route.fulfill({ headers, json: status() });
        }
    );
    await page.goto("/challenge/description");
    await expect(
        page.getByRole("button", { name: "Tier 2 Locked" })
    ).toBeDisabled();
    for (const tier of [1, 2]) {
        await page.locator('input[type="file"]').setInputFiles({
            name: "plan.json",
            mimeType: "application/json",
            buffer: Buffer.from(
                JSON.stringify({ instance: `tier${tier}-sample`, routes: {} })
            )
        });
        await page
            .getByRole("button", { name: "Submit plan", exact: true })
            .click();
        await expect(
            page.getByText(`points on tier${tier}-sample`)
        ).toBeVisible();
        await expect(page.getByText("3 / 3", { exact: true })).toBeVisible();
        await page
            .getByRole("link", { name: `Continue to Tier ${tier + 1}` })
            .click();
        await expect(
            page.getByRole("button", { name: "Submit plan", exact: true })
        ).toBeDisabled();
        if (tier === 1) {
            const downloaded = page.waitForEvent("download");
            await page
                .getByRole("button", { name: "Download world.json" })
                .click();
            expect((await downloaded).suggestedFilename()).toBe("world.json");
            await page.reload();
            await expect(
                page.getByRole("button", { name: "Tier 2 Available" })
            ).toHaveAttribute("aria-pressed", "true");
        }
    }
    await expect(
        page.getByRole("button", { name: "Tier 3 Available" })
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
        page.getByText(/You qualified for the Pro Track/)
    ).toBeVisible();
    await page.getByRole("button", { name: "Tier 1 Passed" }).click();
    await expect(page.getByText("points on tier1-sample")).toBeVisible();
});
