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
    requestTravelReimbursement: false
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
        return ["[name=interestAreas]", "input[name=hasResume]"].map(
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
    await expect(
        page.getByText("max 500 characters", { exact: true })
    ).toBeVisible();
    await expect(
        page.getByText(
            "Upload any supplemental materials that you think might provide more context"
        )
    ).toBeVisible();
    for (const [field, limit] of [
        ["application3", 500],
        ["application1", 1500],
        ["application2", 1500],
        ["applicationOptional", 2000]
    ] as const) {
        const essay = page.locator(`textarea[name=${field}]`);
        await expect(essay).toHaveAttribute("maxlength", String(limit));
        await essay.fill("x".repeat(limit + 1));
        await expect(essay).toHaveValue("x".repeat(limit));
    }

    await uploadResume(page);
    await essays.first().fill(words(51));
    await next(page, testInfo, "ATTENDING");
    await expect(page).toHaveURL(/#attending-hackillinois$/);
    await expect(
        page.getByText("In what ways would you like to get involved with VCs?")
    ).toBeVisible();
    await expect(
        page.getByPlaceholder("Share your ideas or suggestions with us!")
    ).toBeVisible();
    await expect(
        page.locator("textarea[name=eventSuggestions]")
    ).toHaveAttribute("maxlength", "1500");
    await expect(page.locator("textarea[name=hardwareInterest]")).toHaveCount(
        0
    );
    await expect(
        page.getByRole("link", { name: "interest form" })
    ).toHaveAttribute(
        "href",
        "https://docs.google.com/forms/d/e/1FAIpQLSdIa_gWdOqxJYPPtwq1R4JE-73zV955AR1f090xjdY6o7i-4Q/viewform"
    );
    await page
        .getByRole("button", {
            name: testInfo.project.name === "mobile" ? "BACK" : "APPLICATION",
            exact: true
        })
        .click();
    await expect(page.getByText("resume.pdf", { exact: true })).toBeVisible();
    await page.locator("input[type=file][name=hasResume]").setInputFiles({
        name: "replacement.txt",
        mimeType: "text/plain",
        buffer: Buffer.from("Not a PDF")
    });
    await expect(page.getByText("Please upload a PDF file.")).toBeVisible();
    await expect(
        page.getByText("Previous upload is still attached.")
    ).toBeVisible();
    await expect(page.getByText("resume.pdf", { exact: true })).toBeVisible();
    await uploadResume(page);
    await expect(page.getByText("Please upload a PDF file.")).toHaveCount(0);
});

test("legacy drafts over the character cap must be edited before continuing", async ({
    page
}, testInfo) => {
    const overLimit = "x".repeat(501);
    await mockApi(page, { ...draft, application3: overLimit }, testInfo);
    await page.goto("/register/general");
    const response = page.locator("textarea[name=application3]");
    await expect(response).toHaveValue(overLimit);
    await uploadResume(page);
    await next(page, testInfo, "ATTENDING");
    await expect(
        page.getByText("Response cannot be over 500 characters")
    ).toBeVisible();
    await expect(page).toHaveURL(/#application-questions$/);
    await response.fill("x".repeat(500));
    await next(page, testInfo, "ATTENDING");
    await expect(page).toHaveURL(/#attending-hackillinois$/);
});

test("conditional first-hackathon response uses its character cap", async ({
    page
}, testInfo) => {
    await mockApi(page, { ...draft, hackathonsParticipated: "0" }, testInfo);
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#background-information$/);
    const response = page.locator("textarea[name=firstHackathonReason]");
    await expect(response).toHaveAttribute("maxlength", "1500");
    await response.fill(" ".repeat(10));
    await next(page, testInfo, "APPLICATION");
    await expect(
        page.getByText("This field is required", { exact: true })
    ).toBeVisible();
    await response.fill("x".repeat(1501));
    await expect(response).toHaveValue("x".repeat(1500));
    await next(page, testInfo, "APPLICATION");
    await expect(page).toHaveURL(/#application-questions$/);
});

test("area interest: one or both, and a preference only when both", async ({
    page
}, testInfo) => {
    await mockApi(
        page,
        {
            ...draft,
            interestSoftware: "",
            interestHardware: "",
            application3: words(50)
        },
        testInfo
    );
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#application-questions$/);
    await uploadResume(page);
    const area = (name: string) =>
        page
            .locator("[name=interestAreas]")
            .getByRole("checkbox", { name, exact: true });
    const preference = page.locator("#interestPreference");

    // Nothing picked: blocked.
    await next(page, testInfo, "ATTENDING");
    await expect(
        page.getByText("Please choose Software, Hardware, or both")
    ).toBeVisible();
    await expect(page).toHaveURL(/#application-questions$/);

    // One area: no follow-up, nothing else gets picked for them.
    await area("Software").check();
    await expect(area("Hardware")).not.toBeChecked();
    await expect(preference).toHaveCount(0);

    // Both: asks which they prefer, with nothing preselected.
    await area("Hardware").check();
    await expect(preference).toBeVisible();
    await expect(preference.getByRole("radio")).toHaveCount(2);
    for (const radio of await preference.getByRole("radio").all()) {
        await expect(radio).not.toBeChecked();
    }
    await next(page, testInfo, "ATTENDING");
    await expect(
        page.getByText("Please choose which one you are more interested in")
    ).toBeVisible();
    await expect(page).toHaveURL(/#application-questions$/);

    await preference.getByRole("radio", { name: "Hardware" }).check();
    await expect(
        page.getByText("Please choose which one you are more interested in")
    ).toHaveCount(0);

    // Unchecking one drops the follow-up again.
    await area("Hardware").uncheck();
    await expect(preference).toHaveCount(0);
    await expect(area("Software")).toBeChecked();
    await next(page, testInfo, "ATTENDING");
    await expect(page).toHaveURL(/#attending-hackillinois$/);
});

test("a ranked draft shows both areas with its preference", async ({
    page
}, testInfo) => {
    await mockApi(
        page,
        {
            ...draft,
            interestSoftware: "2",
            interestHardware: "1",
            application3: words(50)
        },
        testInfo
    );
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#application-questions$/);
    for (const name of ["Software", "Hardware"]) {
        await expect(
            page
                .locator("[name=interestAreas]")
                .getByRole("checkbox", { name, exact: true })
        ).toBeChecked();
    }
    await expect(
        page
            .locator("#interestPreference")
            .getByRole("radio", { name: "Hardware" })
    ).toBeChecked();
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

test("one area suffices to submit with optional answers blank", async ({
    page
}, testInfo) => {
    const submitted = await mockApi(
        page,
        { ...draft, interestHardware: "", application3: words(50) },
        testInfo
    );
    await page.goto("/register/general");
    await expect(page).toHaveURL(/#application-questions$/);
    await expect(
        page.getByText(
            "Would you like to be considered for HackOutlaws Pro Level?"
        )
    ).toBeVisible();
    await page.locator("#pro input[type=checkbox]").check();
    await uploadResume(page);
    await next(page, testInfo, "ATTENDING");
    await expect(page).toHaveURL(/#attending-hackillinois$/);
    await page.getByText("I understand", { exact: true }).click();
    await next(page, testInfo, "REVIEW");
    await expect(page).toHaveURL(/#review-and-submit$/);
    await expect(
        page.getByText(
            /^Check that your responses.*Registration closes on January 15, 2027 at 11:59 p\.m\. CT\.$/
        )
    ).toBeVisible();
    await page
        .getByRole("button", { name: "Show Attending HackIllinois" })
        .click();
    await expect(page.getByText("VC involvement (optional)")).toBeVisible();
    await expect(page.getByText("Event suggestions (optional)")).toBeVisible();
    await expect(
        page.getByText("Previous hardware response", { exact: true })
    ).toHaveCount(0);
    await page
        .getByRole("button", { name: "Show Application Questions" })
        .click();
    await expect(page.getByText("Software", { exact: true })).toBeVisible();

    const legalLinks = page.locator("#legalAcknowledge a");
    await expect(legalLinks).toHaveText([
        "Privacy Policy",
        "Terms & Conditions",
        "Code of Conduct",
        "Complaint Procedures"
    ]);
    const legalTabs = [
        "privacy-policy",
        "terms-and-conditions",
        "code-of-conduct",
        "complaint-procedures"
    ];
    for (const [i, link] of (await legalLinks.all()).entries()) {
        await expect(link).toHaveAttribute(
            "href",
            `/legal?tab=${legalTabs[i]}`
        );
    }

    await expect(
        page.getByText(/in order to be considered for HackOutlaws Pro Level/)
    ).toBeVisible();

    for (const field of [
        "proChallengeAcknowledge",
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
    await expect(page).toHaveURL(/#confirmation$/);
    await expect(
        page.getByRole("link", { name: "Go to Pro Level Challenge" })
    ).toBeVisible();
    expect(submitted[0]).toMatchObject({
        race: ["Hispanic or Latinx", "White"],
        vcInvolvement: [],
        hardwareInterest: "Not collected in registration",
        application3: words(50),
        interestSoftware: "1",
        interestHardware: "0"
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
