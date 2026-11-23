import { expect, test } from "@playwright/test";

test.describe("Auth middleware & redirect gating", () => {
    test("unauthenticated access to /register/general redirects directly to Google auth", async ({
        page
    }) => {
        let redirectedToAuthUrl = "";
        page.on("request", req => {
            if (req.url().includes("/auth/login/google")) {
                redirectedToAuthUrl = req.url();
            }
        });

        await page.goto("/register/general");

        // Must redirect to Google auth on Adonix with callback parameter
        expect(redirectedToAuthUrl).toContain("/auth/login/google/?redirect=");
        expect(redirectedToAuthUrl).toContain(
            encodeURIComponent("/register/general")
        );

        // Protected registration and login form UI must never be rendered
        await expect(
            page.getByText("Sign in to get started!", { exact: false })
        ).toHaveCount(0);
        await expect(
            page.getByRole("button", { name: /sign in with/i })
        ).toHaveCount(0);
        await expect(
            page.getByRole("heading", { name: "Personal Information" })
        ).toHaveCount(0);
    });

    test("unauthenticated access to /profile redirects directly to Google auth", async ({
        page
    }) => {
        let redirectedToAuthUrl = "";
        page.on("request", req => {
            if (req.url().includes("/auth/login/google")) {
                redirectedToAuthUrl = req.url();
            }
        });

        await page.goto("/profile");
        expect(redirectedToAuthUrl).toContain("/auth/login/google/?redirect=");
        expect(redirectedToAuthUrl).toContain(encodeURIComponent("/profile"));
    });

    test("unauthenticated access to /challenge/description redirects directly to Google auth", async ({
        page
    }) => {
        let redirectedToAuthUrl = "";
        page.on("request", req => {
            if (req.url().includes("/auth/login/google")) {
                redirectedToAuthUrl = req.url();
            }
        });

        await page.goto("/challenge/description");
        expect(redirectedToAuthUrl).toContain("/auth/login/google/?redirect=");
        expect(redirectedToAuthUrl).toContain(
            encodeURIComponent("/challenge/description")
        );
    });

    test("authenticated access with jwt cookie does not redirect to Google auth", async ({
        page
    }, testInfo) => {
        const baseURL = testInfo.project.use.baseURL || "http://127.0.0.1:3023";
        await page.context().addCookies([
            {
                name: "jwt",
                value: "browser-test-token",
                url: baseURL
            }
        ]);

        let hitAuth = false;
        await page.route(
            /^https?:\/\/[^/]+\/auth\/login\/google\//,
            async route => {
                hitAuth = true;
                await route.fulfill({ status: 200, body: "Auth Mock" });
            }
        );

        await page.route(
            /^https?:\/\/[^/]+\/(auth|registration)(\/|$)/,
            async route => {
                const path = new URL(route.request().url()).pathname;
                const headers = {
                    "Access-Control-Allow-Origin":
                        route.request().headers().origin || "*",
                    "Access-Control-Allow-Credentials": "true"
                };
                if (route.request().method() === "OPTIONS") {
                    await route.fulfill({ status: 204, headers });
                    return;
                }
                let data: object = {};
                if (path === "/auth/token")
                    data = { jwt: "browser-test-token" };
                else if (path === "/registration/status/")
                    data = { alive: true };
                else if (
                    path === "/registration/draft" &&
                    route.request().method() === "GET"
                ) {
                    data = {
                        firstName: "Test",
                        lastName: "Applicant",
                        age: "18",
                        email: "test@example.com"
                    };
                } else if (path === "/registration") {
                    data = { error: "NotFound" };
                }
                await route.fulfill({ status: 200, headers, json: data });
            }
        );

        await page.goto("/register/general");
        expect(hitAuth).toBe(false);
    });

    test("public routes are not redirected by auth middleware", async ({
        page
    }) => {
        for (const publicPath of [
            "/",
            "/challenge",
            "/faq",
            "/registration-closed",
            "/profile-unavailable",
            "/rsvp-unavailable"
        ]) {
            let hitAuth = false;
            await page.route(
                /^https?:\/\/[^/]+\/auth\/login\/google\//,
                async route => {
                    hitAuth = true;
                    await route.fulfill({ status: 200, body: "Auth Mock" });
                }
            );

            const response = await page.goto(publicPath);
            expect(response?.status()).toBe(200);
            expect(hitAuth).toBe(false);
        }
    });

    test("OAuth error callback renders error with retry button and does not loop redirect", async ({
        page
    }) => {
        let authRedirectCount = 0;
        page.on("request", req => {
            if (req.url().includes("/auth/login/google")) {
                authRedirectCount++;
            }
        });

        await page.route(
            /^https?:\/\/[^/]+\/(auth|registration)(\/|$)/,
            async route => {
                const path = new URL(route.request().url()).pathname;
                const headers = {
                    "Access-Control-Allow-Origin":
                        route.request().headers().origin || "*",
                    "Access-Control-Allow-Credentials": "true"
                };
                if (route.request().method() === "OPTIONS") {
                    await route.fulfill({ status: 204, headers });
                    return;
                }
                if (path === "/registration/status/") {
                    await route.fulfill({
                        status: 200,
                        headers,
                        json: { alive: true }
                    });
                } else if (path === "/auth/token") {
                    await route.fulfill({
                        status: 401,
                        headers,
                        json: { error: "NoToken" }
                    });
                } else {
                    await route.fulfill({ status: 404, headers, json: {} });
                }
            }
        );

        await page.goto("/register/general?error=access_denied");

        // Should not redirect to Google auth
        expect(authRedirectCount).toBe(0);

        // Should display the error message and the retry button
        const errorAlert = page
            .getByRole("alert")
            .filter({ hasText: "Sign in was cancelled" });
        await expect(errorAlert).toBeVisible();

        const retryButton = page.getByRole("button", {
            name: /try signing in with google again/i
        });
        await expect(retryButton).toBeVisible();

        // Clicking retry button should initiate redirect to Google auth
        let clickedAuth = false;
        await page.route(
            /^https?:\/\/[^/]+\/auth\/login\/google\//,
            async route => {
                clickedAuth = true;
                await route.fulfill({ status: 200, body: "Auth Mock" });
            }
        );

        await retryButton.click();
        expect(clickedAuth).toBe(true);
    });

    test("sessionStorage redirectAttempted flag prevents redirect loop when unauthenticated", async ({
        page
    }) => {
        let authRedirectCount = 0;
        page.on("request", req => {
            if (req.url().includes("/auth/login/google")) {
                authRedirectCount++;
            }
        });

        await page.route(
            /^https?:\/\/[^/]+\/(auth|registration)(\/|$)/,
            async route => {
                const path = new URL(route.request().url()).pathname;
                const headers = {
                    "Access-Control-Allow-Origin":
                        route.request().headers().origin || "*",
                    "Access-Control-Allow-Credentials": "true"
                };
                if (route.request().method() === "OPTIONS") {
                    await route.fulfill({ status: 204, headers });
                    return;
                }
                if (path === "/registration/status/") {
                    await route.fulfill({
                        status: 200,
                        headers,
                        json: { alive: true }
                    });
                } else if (path === "/auth/token") {
                    await route.fulfill({
                        status: 401,
                        headers,
                        json: { error: "NoToken" }
                    });
                } else {
                    await route.fulfill({ status: 404, headers, json: {} });
                }
            }
        );

        // Pre-set sessionStorage flag to simulate having already attempted a redirect
        await page.addInitScript(() => {
            sessionStorage.setItem("googleAuthRedirectAttempted", "true");
        });

        await page.goto("/register/general?error=server_error");

        expect(authRedirectCount).toBe(0);
        const retryButton = page.getByRole("button", {
            name: /try signing in with google again/i
        });
        await expect(retryButton).toBeVisible();
    });
});
