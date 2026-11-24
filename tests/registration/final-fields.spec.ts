import { expect, test, type Page, type TestInfo } from "@playwright/test";

const words = (n: number) => Array(n).fill("word").join(" ");

const personal = {
    firstName: "Test",
    lastName: "Applicant",
    age: "18",
    email: "test@example.com",
    phoneNumber: "2175550100"
};

// Complete through Background Information. Resume and acknowledgements are
// session-scoped, so every draft reload resumes on Application Questions.
const draft = {
    ...personal,
    gender: "Woman",
    race: ["Hispanic or Latinx", "White"],
    country: "United States",
    state: "Illinois",
    school: "University of Illinois at Urbana - Champaign",
    education: "Undergraduate University (3+ year)",
    graduate: "Spring 2028",
    major: "Computer science, computer engineering, or software engineering",
    underrepresented: "No",
    hackathonsParticipated: "1",
    interestSoftware: "1",
    interestHardware: "2",
    application1: words(20),
    application2: words(20),
    attribution: ["Discord"],
    eventInterest: ["Winning Prizes"],
    requestTravelReimbursement: false,
    hardwareInterest: "Arduino kits"
};

async function mockApi(page: Page, saved: object, testInfo: TestInfo) {
    const submitted: Record<string, unknown>[] = [];
    await page.route("https://upload.test/**", route =>
        route.fulfill({
            status: 204,
            headers: { "Access-Control-Allow-Origin": "*" }
        })
    );
    await page.route(
        /^https?:\/\/[^/]+\/(auth|registration|resume|newsletter)(\/|$)/,
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
            else if (path === "/resume/upload") {
                data = { url: "https://upload.test/", fields: {} };
            } else if (path === "/registration/draft") {
                data = request.method() === "GET" ? saved : {};
            } else if (path === "/registration/submit") {
                submitted.push(request.postDataJSON());
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
    return submitted;
}

const next = (page: Page, testInfo: TestInfo, desktopLabel: string) =>
    page
        .getByRole("button", {
            name: testInfo.project.name === "mobile" ? "NEXT" : desktopLabel,
            exact: true
        })
        .click();

const uploadResume = async (page: Page) => {
    await page.locator("input[type=file][name=hasResume]").setInputFiles({
        name: "resume.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from("%PDF-1.4\n%%EOF")
    });
    await expect(page.getByText("resume.pdf")).toBeVisible();
    await expect(page.getByText("Uploading...")).toHaveCount(0);
    await expect(page.getByText("Upload failed")).toHaveCount(0);
};

test("application questions follow the final spec order and limits", async ({
    page
}, testInfo) => {
    await mockApi(page, draft, testInfo);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#application-questions$/);

    const essays = page.locator("textarea[name^=application]");
    await expect(essays.first()).toHaveAttribute("name", "application3");
    // The opening essay comes before the ranking and the resume, too.
    const order = await page.evaluate(() => {
        const at = (sel: string) => document.querySelector(sel)!;
        const essay = at("textarea[name=application3]");
        return [
            "#interestRank, [name=interestRank]",
            "input[name=hasResume]"
        ].map(
            sel =>
                !!(
                    essay.compareDocumentPosition(at(sel)) &
                    Node.DOCUMENT_POSITION_FOLLOWING
                )
        );
    });
    expect(order).toEqual([true, true]);
    await expect(
        page.getByText(
            "Why are you interested in attending hackathons, and what do you hope to gain out of HackIllinois?"
        )
    ).toBeVisible();
    await expect(page.getByText("max 50 words", { exact: true })).toBeVisible();
    await expect(
        page.getByText(
            "Upload any supplemental materials that you think might provide more context"
        )
    ).toBeVisible();
    // Hidden until the hardware interest form URL exists.
    await expect(page.getByText("interest form")).toHaveCount(0);

    await uploadResume(page);
    await essays.first().fill(words(51));
    await next(page, testInfo, "ATTENDING");
    await expect(
        page.getByText("Response cannot be over 50 words")
    ).toBeVisible();
    await expect(page).toHaveURL(/#application-questions$/);

    await essays.first().fill(words(50));
    await next(page, testInfo, "ATTENDING");
    await expect(page).toHaveURL(/#attending-hackillinois$/);
    await expect(
        page.getByText("In what ways would you like to get involved with VCs?")
    ).toBeVisible();
    await expect(
        page.getByPlaceholder("Share your ideas or suggestions with us!")
    ).toBeVisible();
});

test("race options match the final spec", async ({ page }, testInfo) => {
    await mockApi(page, personal, testInfo);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);
    // Gender is the first dropdown on the page, Race / Ethnicity the second.
    await page.getByRole("combobox").nth(1).click();
    await expect(page.getByRole("option")).toHaveText([
        "American Indian or Alaskan Native",
        "Asian",
        "Black or African American",
        "Hispanic or Latinx",
        "I choose not to disclose",
        "Middle Eastern or North African",
        "Native Hawaiian or Other Pacific Islander",
        "White"
    ]);
    // Select all that apply.
    await page.getByRole("option", { name: "Asian", exact: true }).click();
    await page.getByRole("option", { name: "White", exact: true }).click();
    // Keyboard: Enter picks the highlighted option and the menu stays open;
    // Tab then moves on without undoing that pick.
    await page.keyboard.type("Black");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    const chip = (name: string) =>
        page.locator(".MuiChip-root", { hasText: new RegExp(`^${name}$`) });
    await expect(chip("Asian")).toBeVisible();
    await expect(chip("White")).toBeVisible();
    await expect(chip("Black or African American")).toBeVisible();

    // Not disclosing replaces the other answers, and vice versa.
    await page.getByRole("combobox").nth(1).click();
    await page
        .getByRole("option", { name: "I choose not to disclose" })
        .click();
    await expect(page.locator(".MuiChip-root")).toHaveText([
        "I choose not to disclose"
    ]);
    await page.getByRole("option", { name: "Asian", exact: true }).click();
    await expect(page.locator(".MuiChip-root")).toHaveText(["Asian"]);
});

test("a draft with a retired race option asks again", async ({
    page
}, testInfo) => {
    await mockApi(
        page,
        { ...draft, race: ["Two or More Races"], application3: words(50) },
        testInfo
    );
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);
    await expect(page.locator(".MuiChip-root")).toHaveCount(0);
});

test("VC and event suggestions can be left blank through submit", async ({
    page
}, testInfo) => {
    const submitted = await mockApi(
        page,
        { ...draft, application3: words(50) },
        testInfo
    );
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#application-questions$/);
    await uploadResume(page);
    await next(page, testInfo, "ATTENDING");
    await expect(page).toHaveURL(/#attending-hackillinois$/);
    await page.getByText("I understand", { exact: true }).click();
    await next(page, testInfo, "REVIEW");
    await expect(page).toHaveURL(/#review-and-submit$/);
    await page
        .getByRole("button", { name: "Show Attending HackIllinois" })
        .click();
    await expect(page.getByText("VC involvement (optional)")).toBeVisible();
    await expect(page.getByText("Event suggestions (optional)")).toBeVisible();

    for (const field of [
        "reviewedAcknowledge",
        "codeOfConductAcknowledge",
        "mlhDataSharingAcknowledge",
        "legalAcknowledge"
    ]) {
        await page.locator(`#${field} input[type=checkbox]`).check();
    }
    await page
        .getByRole("button", { name: /submit/i })
        .last()
        .click();
    await expect.poll(() => submitted.length).toBe(1);
    expect(submitted[0]).toMatchObject({
        race: ["Hispanic or Latinx", "White"],
        vcInvolvement: [],
        application3: words(50)
    });
    expect(submitted[0].eventSuggestions ?? "").toBe("");
    // Non-optional keys of adonix RegistrationApplicationSubmittedRequestSchema;
    // a missing one is a 400 on submit.
    for (const key of [
        "firstName",
        "lastName",
        "age",
        "email",
        "phoneNumber",
        "gender",
        "race",
        "country",
        "school",
        "education",
        "graduate",
        "major",
        "underrepresented",
        "hackathonsParticipated",
        "interestSoftware",
        "interestHardware",
        "application1",
        "application2",
        "application3",
        "attribution",
        "eventInterest",
        "vcInvolvement",
        "hardwareInterest",
        "requestTravelReimbursement",
        "mlhNewsletter"
    ]) {
        expect(submitted[0], key).toHaveProperty(key);
    }
});
