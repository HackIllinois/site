import { expect, test } from "@playwright/test";

const EXPECTED_ORANGE_BG =
    /linear-gradient\(rgb\(152, 55, 35\) 0(px|%), rgb\(165, 55, 47\) 100%\)/;
// /legal sets its own footer palette to match its sunset background.
const EXPECTED_LEGAL_BG =
    /linear-gradient\(rgb\(30, 4, 49\) 0(px|%), rgb\(19, 2, 31\) 100%\)/;

test("unknown routes return 404 with visible error content above the orange footer", async ({
    page
}) => {
    const response = await page.goto("/skdnfjeke");
    expect(response?.status()).toBe(404);

    const heading = page.getByRole("heading", {
        name: "Page not found",
        exact: true
    });
    await expect(heading).toBeVisible();
    await expect(heading).toBeInViewport();

    const homeLink = page.getByRole("link", {
        name: "Return to the home page",
        exact: true
    });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");

    const footer = page.locator("#site-footer");
    await expect(footer).toBeVisible();
    const layout = await page.evaluate(() => {
        const footerEl = document.getElementById("site-footer")!;
        const headingEl = document.querySelector("h1")!;
        const cs = getComputedStyle(footerEl);
        return {
            bodyHeight: document.body.getBoundingClientRect().height,
            viewportHeight: window.innerHeight,
            headingBottom: headingEl.getBoundingClientRect().bottom,
            footerTop: footerEl.getBoundingClientRect().top,
            footerBg: cs.backgroundImage,
            noOverflow:
                document.documentElement.scrollWidth <= window.innerWidth
        };
    });

    expect(layout.bodyHeight).toBeGreaterThanOrEqual(layout.viewportHeight);
    expect(layout.footerTop).toBeGreaterThanOrEqual(layout.viewportHeight - 1);
    expect(layout.footerTop).toBeGreaterThan(layout.headingBottom);
    expect(layout.footerBg).toMatch(EXPECTED_ORANGE_BG);
    expect(layout.noOverflow).toBe(true);
});

for (const route of [
    "/",
    "/prizes",
    "/travel",
    "/challenge",
    "/job-board",
    "/legal"
]) {
    const expectedBg =
        route === "/legal" ? EXPECTED_LEGAL_BG : EXPECTED_ORANGE_BG;
    test(`${route} shows the site footer at the bottom`, async ({ page }) => {
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);

        const footer = page.locator("#site-footer");
        await expect(footer).toHaveCount(1);
        await expect(page.getByRole("contentinfo")).toHaveCount(1);
        await footer.scrollIntoViewIfNeeded();
        await expect(footer).toBeVisible();

        await expect(
            footer.getByRole("link", { name: "MLH Code of Conduct" })
        ).toBeVisible();
        await expect(
            footer.getByRole("link", { name: "HackIllinois Info Site" })
        ).toBeVisible();
        await expect(
            footer.getByRole("link", { name: "Contact Us" })
        ).toBeVisible();
        await expect(footer.getByRole("link", { name: "Legal" })).toBeVisible();
        await expect(footer).toContainText("© HackIllinois 2027");

        const metrics = await page.evaluate(() => {
            const footerEl = document.getElementById("site-footer")!;
            const rect = footerEl.getBoundingClientRect();
            const cs = getComputedStyle(footerEl);
            return {
                documentTop: rect.top + window.scrollY,
                footerBg: cs.backgroundImage,
                noOverflow:
                    document.documentElement.scrollWidth <= window.innerWidth
            };
        });

        expect(metrics.documentTop).toBeGreaterThan(500);
        expect(metrics.footerBg).toMatch(expectedBg);
        expect(metrics.noOverflow).toBe(true);
    });
}

test("registration uses the same orange footer as the landing page", async ({
    page
}, testInfo) => {
    await page.route(
        /^https?:\/\/[^/]+\/(auth|registration)(\/|$)/,
        async route => {
            const path = new URL(route.request().url()).pathname;
            if (path.startsWith("/registration/backgrounds/")) {
                await route.continue();
                return;
            }
            const headers = {
                "Access-Control-Allow-Origin":
                    route.request().headers().origin || "*",
                "Access-Control-Allow-Credentials": "true"
            };
            if (route.request().method() === "OPTIONS") {
                await route.fulfill({ status: 204, headers });
                return;
            }
            let status = 200;
            let data: object = {};
            if (path === "/auth/token") data = { jwt: "browser-test-token" };
            else if (path === "/registration/status/") data = { alive: true };
            else if (
                path === "/registration/draft" &&
                route.request().method() === "GET"
            ) {
                data = {
                    firstName: "Test",
                    lastName: "Applicant",
                    age: "18",
                    email: "test@example.com",
                    phoneNumber: "2175550100"
                };
            } else if (path === "/registration") {
                status = 404;
                data = { error: "NotFound" };
            }
            await route.fulfill({ status, headers, json: data });
        }
    );

    const baseURL = testInfo.project.use.baseURL || "http://127.0.0.1:3023";
    await page.context().addCookies([
        {
            name: "jwt",
            value: "browser-test-token",
            url: baseURL
        }
    ]);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);

    const footer = page.locator("#site-footer");
    await expect(footer).toHaveCSS("background-image", EXPECTED_ORANGE_BG);

    await footer.getByRole("link", { name: "Legal" }).click();
    await expect(page).toHaveURL(/\/legal$/);
    await expect
        .poll(() => footer.evaluate(el => getComputedStyle(el).backgroundImage))
        .toMatch(EXPECTED_LEGAL_BG);
});
