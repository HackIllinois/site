import { expect, test } from "@playwright/test";

test("cached backgrounds follow repeated Back and Next navigation", async ({
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
    const baseURL = testInfo.project.use.baseURL || "http://127.0.0.1:3018";
    await page.context().addCookies([
        {
            name: "jwt",
            value: "browser-test-token",
            url: baseURL
        }
    ]);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);
    const background = (id: string) =>
        page.locator(`picture:has(img[src$="/${id}-1280.webp"])`);
    const visibleBackground = async (id: string) => {
        await expect(background(id)).toHaveCount(1);
        await expect
            .poll(() =>
                background(id).evaluate(el => getComputedStyle(el).opacity)
            )
            .toBe("1");
    };
    await visibleBackground("canyon_background_info");
    for (let visit = 0; visit < 3; visit++) {
        await page
            .getByRole("button", {
                name: testInfo.project.name === "mobile" ? "BACK" : "PERSONAL",
                exact: true
            })
            .click();
        await expect(page).toHaveURL(/#personal-information$/);
        await visibleBackground("personal_info");
        await expect
            .poll(() =>
                background("canyon_background_info")
                    .locator("img")
                    .evaluate(img => (img as HTMLImageElement).complete)
            )
            .toBe(true);
        await page
            .getByRole("button", {
                name:
                    testInfo.project.name === "mobile" ? "NEXT" : "BACKGROUND",
                exact: true
            })
            .click();
        await expect(page).toHaveURL(/#background-information$/);
        await visibleBackground("canyon_background_info");
    }
});
