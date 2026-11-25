import { expect, test, type Page, type TestInfo } from "@playwright/test";

const personal = {
    firstName: "Test",
    lastName: "Applicant",
    age: "18",
    email: "test@example.com",
    phoneNumber: "2175550100"
};

async function mockApi(page: Page, saved: object, testInfo: TestInfo) {
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
            if (request.method() === "OPTIONS") {
                await route.fulfill({ status: 204, headers });
                return;
            }
            let status = 200;
            let data: object = {};
            if (path === "/auth/token") data = { jwt: "browser-test-token" };
            else if (path === "/registration/status/") data = { alive: true };
            else if (path === "/registration/draft") {
                data = request.method() === "GET" ? saved : {};
            } else if (path === "/registration") {
                status = 404;
                data = { error: "NotFound" };
            }
            await route.fulfill({ status, headers, json: data });
        }
    );
    await page.context().addCookies([
        {
            name: "jwt",
            value: "browser-test-token",
            url: testInfo.project.use.baseURL || "http://127.0.0.1:3018"
        }
    ]);
}

const next = (page: Page, testInfo: TestInfo, desktopLabel: string) =>
    page.getByRole("button", {
        name: testInfo.project.name === "mobile" ? "NEXT" : desktopLabel,
        exact: true
    });

test("phone number only accepts and formats phone numbers", async ({
    page
}, testInfo) => {
    await mockApi(page, {}, testInfo);
    await page.goto("/register/general");
    const phone = page.locator("input[name=phoneNumber]");

    await phone.pressSequentially("82382308023aa");
    await expect(phone).toHaveValue("(823) 823-0802");

    // Deleting back through the punctuation never gets stuck.
    for (let i = 0; i < 14; i++) await phone.press("Backspace");
    await expect(phone).toHaveValue("");

    await phone.pressSequentially("+44 20 7946 0958 ext");
    await expect(phone).toHaveValue("+442079460958");

    await phone.fill("21755");
    await next(page, testInfo, "BACKGROUND").click();
    await expect(page.getByText("Enter a valid phone number")).toBeVisible();
});

test("error text stays readable on the scene art", async ({
    page
}, testInfo) => {
    await mockApi(page, {}, testInfo);
    await page.goto("/register/general");
    await next(page, testInfo, "BACKGROUND").click();

    const error = page.getByText("Email is required");
    await expect(error).toBeVisible();
    await expect(error).toHaveCSS("color", "rgb(255, 168, 160)");
});

test("school search lists each match once and closes with an animation", async ({
    page
}, testInfo) => {
    await mockApi(page, personal, testInfo);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);

    const school = page.locator("#school input");
    const options = page.getByRole("option");

    await school.click();
    await school.pressSequentially("augustana");
    await expect(options).toHaveText(["Augustana College"]);

    // Narrowing the search must not leave rows from the last one behind.
    await school.fill("");
    await school.pressSequentially("stanf");
    await expect(options).toHaveText(["Stanford University"]);

    // The list stays mounted while it animates out, then goes away.
    await options.first().click();
    await expect(school).toHaveValue("Stanford University");
    await expect(page.getByRole("listbox")).toHaveCount(1);
    await expect(page.getByRole("listbox")).toHaveCount(0);
});

test("going back a step crossfades the background", async ({
    page
}, testInfo) => {
    await mockApi(page, personal, testInfo);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);

    const background = (id: string) =>
        page.locator(`picture:has(img[src$="/${id}-1280.webp"])`);
    const opacity = (id: string) =>
        background(id).evaluate(el => Number(getComputedStyle(el).opacity));

    await expect.poll(() => opacity("canyon_background_info")).toBe(1);
    // Visit the first step once so its art is cached, then come back.
    await page
        .getByRole("button", {
            name: testInfo.project.name === "mobile" ? "BACK" : "PERSONAL",
            exact: true
        })
        .click();
    await expect.poll(() => opacity("personal_info")).toBe(1);
    await next(page, testInfo, "BACKGROUND").click();
    await expect.poll(() => opacity("canyon_background_info")).toBe(1);

    await page
        .getByRole("button", {
            name: testInfo.project.name === "mobile" ? "BACK" : "PERSONAL",
            exact: true
        })
        .click();
    // Sample every frame of the handoff: the incoming art has to pass
    // through partial opacity instead of cutting straight to 1.
    const samples = await page.evaluate(
        () =>
            new Promise<number[]>(resolve => {
                const seen: number[] = [];
                const started = performance.now();
                const tick = () => {
                    const el = document.querySelector(
                        'picture:has(img[src$="/personal_info-1280.webp"])'
                    );
                    if (el) seen.push(Number(getComputedStyle(el).opacity));
                    if (performance.now() - started < 600) {
                        requestAnimationFrame(tick);
                    } else resolve(seen);
                };
                tick();
            })
    );
    expect(samples.some(value => value > 0 && value < 1)).toBe(true);
    expect(samples[samples.length - 1]).toBe(1);
});
