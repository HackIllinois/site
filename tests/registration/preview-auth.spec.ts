import { expect, test, type Page } from "@playwright/test";

// The suite runs on 127.0.0.1, which, like a Cloudflare preview host, never
// receives the Adonix sign-in cookie. No cookie is set in these tests.

async function mockApi(page: Page, signedIn: boolean) {
    const logins: string[] = [];
    await page.route(
        /^https?:\/\/[^/]+\/(auth|registration)(\/|$)/,
        async route => {
            const request = route.request();
            const path = new URL(request.url()).pathname;
            if (path.startsWith("/registration/backgrounds/")) {
                await route.continue();
                return;
            }
            const headers = {
                "Access-Control-Allow-Origin": request.headers().origin || "*",
                "Access-Control-Allow-Credentials": "true"
            };
            if (path.startsWith("/auth/login/")) {
                logins.push(request.url());
                await route.fulfill({ status: 200, body: "Google sign-in" });
                return;
            }
            if (request.method() === "OPTIONS") {
                await route.fulfill({ status: 204, headers });
                return;
            }
            let status = 200;
            let data: object = {};
            if (path === "/auth/token") {
                if (signedIn) data = { jwt: "browser-test-token" };
                else {
                    status = 401;
                    data = { error: "NoToken" };
                }
            } else if (path === "/registration/status/") data = { alive: true };
            else if (path === "/registration") {
                status = 404;
                data = { error: "NotFound" };
            }
            await route.fulfill({ status, headers, json: data });
        }
    );
    return logins;
}

test("a signed-in visitor reaches the form on a host without the cookie", async ({
    page
}) => {
    const logins = await mockApi(page, true);
    await page.goto("/register/general");

    await expect(page.locator("input[name=firstName]")).toBeVisible();
    expect(logins).toHaveLength(0);
});

test("a signed-out visitor is sent to Google once, not in a loop", async ({
    page,
    baseURL
}) => {
    const logins = await mockApi(page, false);
    await page.goto("/register/general");
    await expect(page.getByText("Google sign-in")).toBeVisible();
    expect(logins).toHaveLength(1);
    expect(new URL(logins[0]).searchParams.get("redirect")).toBe(
        `${baseURL}/register/general`
    );

    // Google sends them back still signed out (their browser blocked the
    // cookie): they get a retry button instead of another redirect.
    await page.goto("/register/general");
    await expect(
        page.getByRole("button", {
            name: "Try signing in with Google again"
        })
    ).toBeVisible();
    expect(logins).toHaveLength(1);
});
