import { handleError } from "./helpers";
import {
    AcceptAdmissionRSVPRequest,
    AttendeeProfile,
    ChallengeResponse,
    ChallengeStatus,
    MethodType,
    RegistrationApplicationDraftBody,
    RegistrationApplicationSubmitted,
    RSVPInfo,
    EventType
} from "./types";

const APIv2 = "https://adonix.hackillinois.org";

export const isAuthenticated = async (): Promise<boolean> => {
    return (await getAuthToken()) !== null;
};

export async function getAuthToken(): Promise<string | null> {
    const response = await fetch(APIv2 + "/auth/token", {
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        }
    });
    if (response.ok) {
        const data = await response.json();
        return data.jwt;
    }
    return null;
}

export function authenticate(): void {
    // Get the current URL
    const callbackUrl = window.location.pathname;

    const authUrl = `${APIv2}/auth/login/github/?redirect=${window.location.origin}/${callbackUrl}`;
    window.location.replace(authUrl);
}

// If status is good, returns response. If status is bad, throws the error response.
// Should handle errors with handleError.
// Make sure if something like "NotFound" is expected to handle it explicitly and not pass to handleError.
export async function requestv2(
    method: MethodType,
    endpoint: string,
    body?: unknown
) {
    const response = await fetch(APIv2 + endpoint, {
        method,
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Origin: "www.hackillinois.org"
        },
        body: JSON.stringify(body)
    });

    const responseJSON = await response.json();

    if (
        responseJSON.error === "TokenInvalid" ||
        responseJSON.error == "TokenExpired" ||
        responseJSON.error == "NoToken"
    ) {
        sessionStorage.removeItem("token");
        authenticate();
        throw responseJSON;
    }

    if (!response.ok) {
        throw responseJSON;
    }

    return responseJSON;
}

export async function getChallenge(
    shouldThrow?: boolean
): Promise<ChallengeStatus> {
    const res = await requestv2("GET", "/registration/challenge/").catch(e => {
        if (shouldThrow) {
            handleError(e);
        }
    });
    return res;
}

export async function submitChallenge(file: File): Promise<ChallengeResponse> {
    const form = new FormData();
    form.append("solution", file);

    const response = await fetch(APIv2 + "/registration/challenge/", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: form
    });

    const responseJSON = await response.json();

    if (
        responseJSON.error === "TokenInvalid" ||
        responseJSON.error == "TokenExpired" ||
        responseJSON.error == "NoToken"
    ) {
        sessionStorage.removeItem("token");
        authenticate();
        throw responseJSON;
    }

    return { status: response.status, body: responseJSON };
}

export async function subscribe(
    listName: string,
    emailAddress: string
): Promise<string> {
    const res = await requestv2("POST", "/newsletter/subscribe/", {
        listName,
        emailAddress
    }).catch(body => handleError(body));
    return res;
}

export async function saveDraft(data: RegistrationApplicationDraftBody) {
    return await requestv2("PUT", "/registration/draft", data);
}

export async function loadDraft() {
    return (await requestv2(
        "GET",
        "/registration/draft"
    )) as RegistrationApplicationDraftBody & {
        userId: string;
    };
}

export async function submitDraft(body: RegistrationApplicationDraftBody) {
    return await requestv2("POST", "/registration/submit", body);
}

export async function loadSubmission(): Promise<RegistrationApplicationSubmitted> {
    return await requestv2("GET", "/registration");
}

export async function loadProfile(): Promise<AttendeeProfile> {
    return await requestv2("GET", "/profile");
}

export async function updateProfile(
    body: Partial<AcceptAdmissionRSVPRequest>
): Promise<AttendeeProfile> {
    return await requestv2("PUT", "/profile", body);
}

export async function loadAdmissionRSVP(): Promise<RSVPInfo> {
    return await requestv2("GET", "/admission/rsvp/");
}

export async function declineAdmissionRSVP(): Promise<void> {
    return await requestv2("PUT", "/admission/decline/");
}

export async function acceptAdmissionRSVP(
    body: AcceptAdmissionRSVPRequest
): Promise<RSVPInfo> {
    return await requestv2("PUT", "/admission/accept/", body);
}

export async function uploadFile(file: File): Promise<unknown> {
    const { url, fields } = await requestv2("GET", "/resume/upload");
    const data = new FormData();
    for (const key in fields) {
        data.append(key, fields[key]);
    }
    data.append("file", file, file.name);
    const res = await fetch(url, { method: "POST", body: data });

    if (!res.ok) {
        const errorBody = await res.text();
        handleError({
            message: errorBody,
            status: res.status,
            type: "upload_error"
        });
    }
    return res;
}

export async function registrationAlive(): Promise<boolean> {
    const response = (await requestv2(
        "GET",
        "/registration/status/"
    )) satisfies { alive: boolean };
    return response.alive;
}

export async function postAuthRefresh(): Promise<void> {
    await requestv2("POST", "/auth/refresh", {});
}

export async function getEvents(): Promise<EventType[]> {
    // const res = await requestv2("GET", "/event").catch(handleError);
    const res = {
        events: [
            {
                menu: [],
                _id: "673557088e5e0da6e62b60a3",
                eventId: "11eeb67308a10cfe301cd925b263cd45",
                isStaff: true,
                name: "Staff Meeting (Nov 13)",
                description: "Nov 13 staff meeting.",
                startTime: 1731549600,
                endTime: 1731553200,
                eventType: "MEETING",
                exp: 1731553200,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "673c08aff155ff144c035cbd",
                eventId: "889c7dc5b95812786040c35c84153626",
                isStaff: true,
                name: "iOS EVENT (DO NOT DELETE)",
                description:
                    "A never-expiring event for testing purposes (iOS needed an event for testing scanning)",
                startTime: 1731952800,
                endTime: 1731952800,
                eventType: "MEETING",
                exp: 1731952800,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "673cbb186553c1381d14e95d",
                eventId: "775795ac02c13a41a051bf2f30273b33",
                isStaff: true,
                name: "Staff Meeting (Nov 20)",
                description: "Nov 20 staff meeting.",
                startTime: 1732154400,
                endTime: 1732158000,
                eventType: "MEETING",
                exp: 1732159800,
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                locations: []
            },
            {
                menu: [],
                _id: "6750d927a26c044cfca203ce",
                eventId: "7359985f63badab1d6650e6b0ef84495",
                isStaff: true,
                name: "Staff Meeting (Dec 4)",
                description: "Dec 4 staff meeting.",
                startTime: 1733364000,
                endTime: 1733367600,
                eventType: "MEETING",
                exp: 1733369400,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67919b5c9dac35e2a486df03",
                eventId: "6084c095d52698a96358e4ef9dbf0de9",
                isStaff: true,
                name: "Staff Meeting (Jan 22nd)",
                description: "Jan 22 staff meeting.",
                startTime: 1734919200,
                endTime: 1734922800,
                eventType: "MEETING",
                exp: 1737601200,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "679aa3c15eb72885158da9e0",
                eventId: "3d26d270a71cb78c1d1f803d8dde962e",
                isStaff: true,
                name: "Staff Meeting (Jan 29)",
                description: "",
                startTime: 1738202400,
                endTime: 1738209600,
                eventType: "MEETING",
                exp: 1738211400,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67a408699d97360e06fcbef4",
                eventId: "8a5a534994c03d35192e2b69f84b77eb",
                isStaff: true,
                name: "Staff Meeting (Feb 5)",
                description: "",
                startTime: 1738803600,
                endTime: 1738810800,
                eventType: "MEETING",
                exp: 1738812600,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67ad1e7d0746794120341c02",
                eventId: "64105b965904a7393278ce2d76dc3c23",
                isStaff: true,
                name: "Staff Meeting (Feb 12)",
                description: "",
                startTime: 1740016800,
                endTime: 1740020400,
                eventType: "MEETING",
                exp: 1740024000,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67b68e6c55fa2d15b5cbf13b",
                eventId: "cf157cd76fa56e448d2939691d7c9627",
                isStaff: true,
                name: "Staff Meeting (Feb 19)",
                description: "Feb 19 staff meeting",
                startTime: 1739383200,
                endTime: 1739383200,
                eventType: "MEETING",
                exp: 1739385000,
                locations: [],
                isAsync: false,
                mapImageUrl: "",
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67bfc96df66e7fa10c33109d",
                eventId: "bea33f651b6cede5ae278dd6bd758755",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1740621600,
                endTime: 1740625200,
                eventType: "MEETING",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67c379cf32f53e65fca3cd87",
                eventId: "d8fffaf1391ef86fdd1e29be48f95979",
                isStaff: true,
                name: "iOS EVENT (DO NOT DELETE) (Copy)",
                description:
                    "A never-expiring event for testing purposes (iOS needed an event for testing scanning)",
                startTime: 1731952800,
                endTime: 1731952800,
                eventType: "MEETING",
                exp: 1731952800,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67c379f132f53e65fca3cde4",
                eventId: "e78dca93dc5afa1f914d59dbcb7c377d",
                isStaff: true,
                name: "iOS EVENT (DO NOT DELETE) (Copy) (Copy)",
                description:
                    "A never-expiring event for testing purposes (iOS needed an event for testing scanning)",
                startTime: 1731952800,
                endTime: 1731952800,
                eventType: "MEETING",
                exp: 1731952800,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "67c379fd32f53e65fca3cdf8",
                eventId: "b9414a74c03a1a2c5bb4b0a02278c10e",
                isStaff: true,
                name: "iOS EVENT (DO NOT DELETE) (Copy) (Copy) (Copy)",
                description:
                    "A never-expiring event for testing purposes (iOS needed an event for testing scanning)",
                startTime: 1731952800,
                endTime: 1731952800,
                eventType: "MEETING",
                exp: 1731952800,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "688421aa641e73b71a8322cd",
                eventId: "5d953dce1d415fef39692f4fbe6a7c12",
                isStaff: true,
                name: "Test event",
                description: "",
                startTime: 1753489800,
                endTime: 1753493400,
                eventType: "MEETING",
                exp: 1753493400,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68a247b7641e73b71a8347f2",
                eventId: "48b3bf3b6dbb0f2d37a3595117d4c777",
                isStaff: true,
                name: "Test",
                description: "test",
                startTime: 1755450000,
                endTime: 1755450000,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel test",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: true,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "68b8d064641e73b71a8361d1",
                eventId: "448a979ce2933b8b1f55e25a6424cd6e",
                isStaff: true,
                name: "Staff Meeting (Sep 3)",
                description: "Sep 3 staff meeting",
                startTime: 1756947600,
                endTime: 1756951200,
                eventType: "MEETING",
                exp: 1756951200,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68c2152e641e73b71a83744e",
                eventId: "505f847e2e3b6f281a10187645c86c1b",
                isStaff: true,
                name: "Staff Meeting (Sep. 10)",
                description: "",
                startTime: 1757552400,
                endTime: 1757556000,
                eventType: "MEETING",
                exp: 1757556000,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68d477fc641e73b71a83965b",
                eventId: "a21e9453bbcd0e1d756e01f3830dd943",
                isStaff: true,
                name: "Test",
                description: "TEST EVENT ONLY. DO NOT USE.  TEST",
                startTime: 1758733200,
                endTime: 1758906000,
                eventType: "OTHER",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "68d47c95641e73b71a839720",
                eventId: "994f89f682e07e533056dfe1cb33cdc6",
                isStaff: true,
                name: "Staff Meeting (Sep. 24)",
                description: "",
                startTime: 1758762000,
                endTime: 1758765600,
                eventType: "MEETING",
                exp: 1758765600,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68ddb91ddbdbe57a299bd6e1",
                eventId: "febe676a5fb3d07a689f4b6fb45fed2e",
                isStaff: true,
                name: "Staff Meeting (Oct. 1)",
                description: "",
                startTime: 1759366800,
                endTime: 1759374000,
                eventType: "MEETING",
                exp: 1759370400,
                locations: [
                    {
                        description: "Siebel 1404",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68e6f78bdbdbe57a299be34c",
                eventId: "ad352c8483f9e3fb70d6e575b6ce8e68",
                isStaff: true,
                name: "Staff Meeting (Oct. 8)",
                description: "",
                startTime: 1759971600,
                endTime: 1759975200,
                eventType: "MEETING",
                exp: 1759975200,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68f036e485108eac3e12f6e7",
                eventId: "fa8cd90067cd24dd59fbead2e1088685",
                isStaff: true,
                name: "Staff Meeting (Oct. 15)",
                description: "",
                startTime: 1760576400,
                endTime: 1760583600,
                eventType: "MEETING",
                exp: 1760580000,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68f953e40bdfce77d4ba9fb2",
                eventId: "69cafc82d4912455f2725cf92276d694",
                isStaff: true,
                name: "Staff Meeting (Oct. 22)",
                description: "",
                startTime: 1761181200,
                endTime: 1761184800,
                eventType: "MEETING",
                exp: 1761184800,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "68fea178b1c0abff3ac160a7",
                eventId: "01613e57df5c59ae8666a57036fba654",
                isStaff: true,
                name: "test",
                description: "",
                startTime: 1761152400,
                endTime: 1761152400,
                eventType: "MEETING",
                exp: 0,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false
            },
            {
                menu: [],
                _id: "6902aa03cacf88c38d7672fb",
                eventId: "9cceba537dd9f5f61e77ce41d86c4c70",
                isStaff: true,
                name: "Staff Meeting (Oct. 29)",
                description: "",
                startTime: 1761786000,
                endTime: 1761798600,
                eventType: "MEETING",
                exp: 1761798600,
                locations: [
                    {
                        description: "Siebel 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "690bd80a99077e7600ff3773",
                eventId: "b5bb40e52db61b30006dc3e34b00b6cc",
                isStaff: true,
                name: "Staff Meeting (Nov. 5)",
                description: "",
                startTime: 1762394400,
                endTime: 1762398000,
                eventType: "MEETING",
                exp: 1762398000,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isPro: false,
                isMandatory: true
            },
            {
                menu: [],
                _id: "6915126d80cf43ad41803f32",
                eventId: "cbf3388499d1944cb68121be72d60142",
                isStaff: true,
                name: "Staff Meeting (Nov. 12)",
                description: "",
                startTime: 1762999200,
                endTime: 1763002800,
                eventType: "MEETING",
                exp: 1763002800,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false
            },
            {
                menu: [],
                _id: "691e57424e28af090d57a60d",
                eventId: "20443405201b723214c1e48e59826534",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1763604000,
                endTime: 1763614800,
                eventType: "MEETING",
                exp: 1763614800,
                locations: [
                    {
                        description: "Siebel 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false
            },
            {
                menu: [],
                _id: "6930e2bbf59cc5f75ab5b9ec",
                eventId: "fe08789f1e7317ff65a4a4cee81021d6",
                isStaff: true,
                name: "Staff Meeting",
                description: "attendance for staff meeting on dec 3rd",
                startTime: 1764813600,
                endTime: 1764817200,
                eventType: "MEETING",
                exp: 0,
                locations: [
                    {
                        description: "Siebel 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false
            },
            {
                menu: [],
                _id: "693a1fbd14c145e58f8a807b",
                eventId: "fe98a1d9d82b8c1b797e6ec4d208d607",
                isStaff: true,
                name: "Staff Meeting (Dec 10)",
                description: "",
                startTime: 1765418400,
                endTime: 1765422000,
                eventType: "MEETING",
                exp: 1765422000,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false
            },
            {
                menu: [],
                _id: "697159e9d5557be60f769388",
                eventId: "c60447e6dfc387529a3c90df2102a085",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1769047200,
                endTime: 1769058000,
                eventType: "MEETING",
                exp: 1769058000,
                locations: [
                    {
                        description: "Siebel 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false
            },
            {
                _id: "6973e9cac0901c088b8d2c33",
                eventId: "ac49f5813c92452cc8240e99766410c8",
                isStaff: false,
                name: "Attendee Check-In",
                description:
                    "Please install the HackIllinois mobile app and sign in with your Github account before arriving. Note that Check-in is required to submit a project and be eligible for prizes!",
                startTime: 1772222400,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Lobby",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "6973e9e8c0901c088b8d2c3f",
                eventId: "a709ce5d06d5ae8a2df8e31366185066",
                isStaff: false,
                name: "Opening Ceremony",
                description: "",
                startTime: 1772233200,
                endTime: 1772236800,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1404",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                rafflePoints: 0
            },
            {
                _id: "6973ea08c0901c088b8d2c45",
                eventId: "290b73fd03cd4c56d3bb71015752437a",
                isStaff: false,
                name: "Dinner - Sponsored by Fulcrum",
                description: "",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "MEAL",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 2nd Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                menu: [],
                _id: "6977d53ec0901c088b8d66ab",
                eventId: "c397777832d8654a3b0e179fcaa5acc1",
                isStaff: true,
                name: "test scanning ",
                description: "test",
                startTime: 1769450400,
                endTime: 1769473800,
                eventType: "MEETING",
                exp: 1769473800,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false
            },
            {
                menu: [],
                _id: "697aa95f520cd428d986bedf",
                eventId: "e435060fbc16e1ae2de927812010ba99",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1769652000,
                endTime: 1769662800,
                eventType: "MEETING",
                exp: 0,
                locations: [
                    {
                        description: "Siebel 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false
            },
            {
                menu: [],
                _id: "6983ed15db9956ae5b353b5c",
                eventId: "0256548a6e6a7cd60a8815d8b0ab8262",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1770256800,
                endTime: 1770264000,
                eventType: "MEETING",
                exp: 1770264000,
                locations: [
                    {
                        description: "Siebel ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false
            },
            {
                _id: "698d1b83a5ddbd4b0e4cf152",
                eventId: "dd1e32ce6f194065e72701d42069f3a9",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1770861600,
                endTime: 1770872400,
                eventType: "MEETING",
                exp: 1770872400,
                locations: [
                    {
                        description: "Siebel 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: true,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: true,
                isPro: false,
                menu: []
            },
            {
                _id: "698ff1fc24d8351e754a636e",
                eventId: "beb194ef52ecdecfe5fe80f4605e4c15",
                isStaff: false,
                name: "Solar Search",
                description:
                    "Your spaceship is lost in the galaxy! To get your ship back on trajectory, complete the four cosmic tasks located at different planets’ outposts throughout the building. \n",
                startTime: 1772224200,
                endTime: 1772231400,
                eventType: "MINIEVENT",
                exp: 1772233200,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science Basement, 1st Floor, 2nd Floor",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor0.png",
                rafflePoints: 0
            },
            {
                _id: "698ff53c24d8351e754a63a1",
                eventId: "59df90c8d8080ca76f9db37b2bc9fe0f",
                isStaff: false,
                name: "Company Expo",
                description:
                    "The galaxy hinges on the innovation and investment of companies. Come to the Company Expo to find and join the brightest of companies. Rumors across the galaxies say these companies shine brighter than the stars themselves!",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                rafflePoints: 0
            },
            {
                _id: "698ff68c24d8351e754a63c2",
                eventId: "920e5232bd5c4ad98f358f51406549b4",
                isStaff: false,
                name: "RSO Expo",
                description:
                    "Our large crew size for this mission has brought together space cadets of many diverse backgrounds. Finding a community you love is pivotal to your success. Come to the RSO Expo to explore some opportunities! ",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                rafflePoints: 0
            },
            {
                _id: "698ff87024d8351e754a63f3",
                eventId: "4b5786c63a5def61b8862ae983ac0349",
                isStaff: false,
                name: "Modal Track Introduction",
                description:
                    "Modal is AI infrastructure developers love, used by companies like Ramp, Suno and Lovable. With flexible GPU compute, code sandboxes, and storage, you can use Modal to run inference or train coding agents, voice agents and more. For the Inference Track, submissions should showcase ambitious applications running inference on Modal to solve a real-world problem.",
                startTime: 1772242200,
                endTime: 1772245800,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1302",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Modal",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                rafflePoints: 0
            },
            {
                _id: "698ff90c24d8351e754a640e",
                eventId: "54347d28ca57dd5c21a1b323c9199c78",
                isStaff: false,
                name: "John Deere Track Introduction",
                description:
                    "Join John Deere to learn more about what their track entails! After this workshop, attendees will be given autonomous vehicle kits on a first-come-first-server basis (RSVP form to be released soon). \nNote: this workshop is mandatory to attend if you wish to participate in John Deere’s track. Located @ the Jackson Innovation Studio in the basement of Sidney Lu Mechanical Engineering Building. ",
                startTime: 1772242200,
                endTime: 1772245800,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Sidney Lu Mechanical Engineering Building ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "John Deere",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ff94a24d8351e754a6421",
                eventId: "bc4233ed921ed4e811f0647ae16f6f2f",
                isStaff: false,
                name: "Stripe Track Introduction",
                description:
                    "APIs are the heart of modern software systems, enabling services to communicate and evolve independently. In the Stripe Track, you will build a well-designed, documented, and usable API that helps a user accomplish a meaningful goal.\n",
                startTime: 1772242200,
                endTime: 1772245800,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 0216",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Stripe",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ff99124d8351e754a642a",
                eventId: "7efd1b791157549006234798df2d2c12",
                isStaff: false,
                name: "Caterpillar Track Introduction",
                description:
                    "The future of intelligent field inspection lies in your hands, the mission being to redefine what’s possible in field operations. In the CAT track, you will create a next-generation AI tool that should revolutionize how inspections, safety, and logistics are performed by making field operations smarter, faster, and safer at scale.\n",
                startTime: 1772242200,
                endTime: 1772245800,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Caterpillar",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ffa7f24d8351e754a645b",
                eventId: "0ae0887d0c8887441012b44008176b2e",
                isStaff: false,
                name: "Team Matching",
                description:
                    "Full team-less Hackstronauts, come one, come all! Find your squad, find your track, and kickstart your mission!\n",
                startTime: 1772245800,
                endTime: 1772249400,
                eventType: "WORKSHOP",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 0218",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ffabf24d8351e754a6461",
                eventId: "ea262d7a62602158d69e54135f58f6b2",
                isStaff: false,
                name: "HackVoyagers Talk w/ Fulcrum",
                description: "",
                startTime: 1772245800,
                endTime: 1772247600,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Fulcrum",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ffb3e24d8351e754a646a",
                eventId: "cd2c19d68b170a7826c4bd9c1ca91f4c",
                isStaff: false,
                name: "Project Development Session w/ Fulcrum",
                description:
                    "All discoveries are made through trial and error. Fear not the unknown! Fulcrum will be present to bring your ideas into fruition and provide further guidance. \n",
                startTime: 1772247600,
                endTime: 1772251200,
                eventType: "WORKSHOP",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Fulcrum",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ffbd924d8351e754a6477",
                eventId: "b126bf2ba3c945d54301f84849c5f407",
                isStaff: false,
                name: "Deployment Workshop w/ Women in Computer Science",
                description:
                    "Each planet’s work flow environment throws its own challenges at you. WCS is here to help you launch into the unknown with a project deployment workshop!\n",
                startTime: 1772251200,
                endTime: 1772254800,
                eventType: "WORKSHOP",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 0216",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698ffe0924d8351e754a652a",
                eventId: "c9d3a83e577314418042c307cecd8b7d",
                isStaff: false,
                name: "Startup Workshop w/ Telora",
                description:
                    "Join us to hear from Eliam, the founder of Telora and a previous founder of a startup that was backed by YC and Founders Fund before being acquired by MetLife. You'll learn why you need a cofounder, what makes a good startup idea, and how to find your first few customers.",
                startTime: 1772253000,
                endTime: 1772256600,
                eventType: "WORKSHOP",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1302",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Telora",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698fff2624d8351e754a6564",
                eventId: "5e4473f0ebe8fd4b7d7add911912fe3d",
                isStaff: false,
                name: "IMC Poker Tournament",
                description:
                    "The intergalactic navigation skills you possess translate well to other activities…come show off your skills to the rest of the space crew at HackIllinois’ first ever Poker Tournament, brought to you by IMC. \n",
                startTime: 1772254800,
                endTime: 1772262000,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "IMC",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "698fffc524d8351e754a6589",
                eventId: "daf157002f6761adb429ba4bb50ec43a",
                isStaff: false,
                name: "Quiet Workspace",
                description:
                    "The mission is of utmost importance. This designated Quiet Workspace will be provided to those who work best in starlit silence. \n",
                startTime: 1772254800,
                endTime: 1772262000,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1302",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "6990003024d8351e754a65b6",
                eventId: "f2f794661d746dce2bb8789af45b4c4b",
                isStaff: false,
                name: "Midnight Snack",
                description:
                    "Sustenance is pivotal for our success. Thankfully, we have treats to replenish your energy! ",
                startTime: 1772258400,
                endTime: 1772260200,
                eventType: "MEAL",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "6990036624d8351e754a65f2",
                eventId: "568b6c22c9f64a8a4002d6aa37ef8c2f",
                isStaff: false,
                name: "Transition to Overnight Hacking Space",
                description:
                    "Guided transition to Siebel Center for Design, where designated spaces are available for those wishing to continue their work overnight. Information for the procedure is available in the Attendee Guide.",
                startTime: 1772260200,
                endTime: 1772265600,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Design ",
                        latitude: 40.1026852,
                        longitude: -88.235361
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "699004c124d8351e754a6691",
                eventId: "fbf957460265c31e62954c9aa066fb56",
                isStaff: false,
                name: "Brunch ",
                description:
                    "Take a break from hacking and grab some food with your crew. Refuel, relax, and get ready for the next part of your mission.",
                startTime: 1772298000,
                endTime: 1772303400,
                eventType: "MEAL",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 2nd Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "6990050d24d8351e754a669e",
                eventId: "a9099905c1996a2af2da4f8cec5b0f88",
                isStaff: false,
                name: "Blockchain Workshop w/ Solana",
                description:
                    "Solana is powering fast and modern blockchain applications. It would be wise to learn from their expertise. See what you can build and how it can fit into your hack.\n",
                startTime: 1772301600,
                endTime: 1772305200,
                eventType: "WORKSHOP",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1302",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Solana",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "6990069e24d8351e754a66ba",
                eventId: "1bb03cc8d9f9d4b9429c69240c0b44e1",
                isStaff: false,
                name: "Cosmic Challenge",
                description:
                    "The engines cut out, the power disappeared, you’re adrift in the void of space. What would you do in this hypothetical situation? Prove yourself to be the worthiest of Hackstronauts with a gauntlet of technical challenges we have prepared especially for you. \n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "699006e924d8351e754a66c0",
                eventId: "96c44e91ca6a98d59a2ea60f6d27a185",
                isStaff: false,
                name: "Endeavor AI Talk",
                description:
                    "In all galaxies, intelligence of life and machines drives societies. Curious about AI in the real world? Join this session to hear how Endeavor AI builds and uses intelligent systems.\n",
                startTime: 1772308800,
                endTime: 1772310600,
                eventType: "SPEAKER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 0218",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Endeavor AI",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "699007f124d8351e754a66d0",
                eventId: "4ff975242d04b4827f1d01d9311bede3",
                isStaff: false,
                name: "Tech Talk w/ IMC",
                description:
                    "Join us for an inside look at Tech @ IMC! You’ll hear from engineers across our tech organization about the challenges they tackle daily, from optimizing low-latency systems to scaling infrastructure that supports real-time decision-making. Learn how our teams are structured, how technologists collaborate with traders and researchers, and why opportunities within trading are exciting for technologists.",
                startTime: 1772312400,
                endTime: 1772316000,
                eventType: "SPEAKER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "IMC Trading",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "6990086624d8351e754a66d7",
                eventId: "a50016398e814ff0bb338d4c1e87b49a",
                isStaff: false,
                name: "Tech Talk w/ T-Mobile",
                description:
                    "Join us to hear how T-Mobile is using AI-powered live translation to break down language barriers in real time across our retail and care groups. We’ll share how speech recognition, advanced translation models, and voice technology are coming together to create more seamless and inclusive experiences. If you’re excited about building AI that removes friction at scale, this session is for you.",
                startTime: 1772316000,
                endTime: 1772319600,
                eventType: "SPEAKER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 0216",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "T-Mobile",
                points: 75,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "699008c924d8351e754a66dd",
                eventId: "5726796262617e5879e8aa9b2bcb67b3",
                isStaff: false,
                name: "Capital One Super Smash Bros Ultimate Tournament",
                description:
                    "Ready to change gaming for good? Come join us for a Super Smash Bros Ultimate tournament sponsored by Capital One! Whether you’re interested in battling for glory or just want to cheer on your favorite fighter, everyone is invited to the fun! This tournament is open to ALL hackers of ALL skill levels: to secure a spot in our tournament bracket, be on the lookout for signup announcements, or come check us out right before we start to ask about walk-in availability. Winners of the tournament (and maybe some lucky audience members) will receive exclusive Capital One swag. So don’t miss out on the event of the season, and may the best hacker win!",
                startTime: 1772321400,
                endTime: 1772325000,
                eventType: "SPEAKER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Capital One",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "699009f324d8351e754a66ea",
                eventId: "0838e5081bc0370916f7ab1908f5c772",
                isStaff: false,
                name: "The Astral Exhibition",
                description:
                    "While we explore this galaxy, the locals have provided an exhibition to share their cultures! Calling all Hackstronauts: taste and experience this once-in-a-lifetime opportunity!",
                startTime: 1772319600,
                endTime: 1772326800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900b1c24d8351e754a6708",
                eventId: "595dd86483997cf1160fca2f338cc851",
                isStaff: false,
                name: "Dinner - Sponsored by Exa",
                description:
                    "Food is a universal need; come report in for your daily rations!",
                startTime: 1772325000,
                endTime: 1772330400,
                eventType: "MEAL",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 2nd Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900bbe24d8351e754a670e",
                eventId: "9c69bca0e365e07bae66bbac6ac4898f",
                isStaff: false,
                name: "MLH Tech Together Meetup",
                description:
                    "Join MLH at this networking session for individuals of underrepresented groups in Computer Science!",
                startTime: 1772330400,
                endTime: 1772334000,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1302",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900c1624d8351e754a6724",
                eventId: "378cdbea1551477a42aa382a4652dc2a",
                isStaff: false,
                name: "Code in the Dark w/ Caterpillar",
                description:
                    "Far too often the beauty of space is ignored. In the silence, the glistening stars provide comfort. Caterpillar has found the best location to enjoy the darkness. Report in for galaxy expanding vibe coding.",
                startTime: 1772334000,
                endTime: 1772337600,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "Caterpillar",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900c9124d8351e754a672a",
                eventId: "effab8707c2ecf3a9df032041268317b",
                isStaff: false,
                name: "Clash Royale Tournament",
                description:
                    "Put on your space suits, gather your elixirs, and build your deck! Compete in a Clash Royale tourney to declare yourself the strongest of the crew! Prizes and intergalactic glory await! HEE HEE HEE HAW!",
                startTime: 1772339400,
                endTime: 1772343000,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1404",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900d0724d8351e754a6733",
                eventId: "0ddd3c311bd6951ab4efe5ffd6d64082",
                isStaff: false,
                name: "Late Night Snacks",
                description:
                    "The galaxy has a variety of tastes. Our finest local guides have found some treats to keep you Hacking! ",
                startTime: 1772339400,
                endTime: 1772343000,
                eventType: "MEAL",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900d7e24d8351e754a673d",
                eventId: "4c2ed6002e22a8c5e27d33b2b0cdaa50",
                isStaff: false,
                name: "Transition to Overnight Hacking Space",
                description:
                    "Guided transition to Siebel Center for Design, where designated spaces are available for those wishing to continue their work overnight. Information for the procedure is available in the Attendee Guide.",
                startTime: 1772346600,
                endTime: 1772352000,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Design ",
                        latitude: 40.1026852,
                        longitude: -88.235361
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900dba24d8351e754a6743",
                eventId: "30ef3bd1f25ae3a5902f9975dd9045ea",
                isStaff: false,
                name: "SUBMISSION DEADLINE",
                description:
                    "Your expedition is coming to an end. Make sure to submit your project to the DevPost before the deadline!\n",
                startTime: 1772366400,
                endTime: 1772366400,
                eventType: "OTHER",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "69900dfa24d8351e754a6749",
                eventId: "102388c694360a4f93216c15b5979ab1",
                isStaff: false,
                name: "[ALL ATTENDEES] Project Showcase",
                description:
                    "Hackers, prepare for landing and showcase what you’ve built. Mission control is watching—let your project make history among the stars. Please arrive by 8:45am.",
                startTime: 1772377200,
                endTime: 1772386200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900e3924d8351e754a6750",
                eventId: "d4a8b0319b88e9dbbf4baac2d5421ac5",
                isStaff: false,
                name: "Lunch",
                description:
                    "Treat yourself with a hearty meal after a weekend of exploration and discoveries. ",
                startTime: 1772386200,
                endTime: 1772389800,
                eventType: "MEAL",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 2nd Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: true,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69900e9124d8351e754a6756",
                eventId: "1def0b2a622fd64b36e0007eca7d184b",
                isStaff: false,
                name: "Closing Ceremonies",
                description:
                    "The voyage is now complete. Mission control has been watching as your ideas took flight. Teams rise and projects shine, as HackAstra fades into the starry night.\n",
                startTime: 1772395200,
                endTime: 1772398800,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 1404",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: [],
                rafflePoints: 0
            },
            {
                _id: "69966a2b1fb203736839d4a8",
                eventId: "c1a571630a7d32344d69dd311a275b43",
                isStaff: true,
                name: "Staff Meeting",
                description: "",
                startTime: 1771466400,
                endTime: 1771470000,
                eventType: "MEETING",
                exp: 1771470000,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 0,
                rafflePoints: 0,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699a413593ae0db46b648148",
                eventId: "961ed57a5f3d65359142e10d81c2bbad",
                isStaff: false,
                name: "Fireside Chat w/ Cory Levy",
                description: "",
                startTime: 1772330400,
                endTime: 1772334000,
                eventType: "SPEAKER",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 75,
                isPrivate: false,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699a87ec93ae0db46b648787",
                eventId: "868f05898f4d4e9f0e3599b8f6480720",
                isStaff: false,
                name: "Solar Search- Lava Cat Planet QR Code",
                description: "QR Code for Solar Search-Lava Cat Planet",
                startTime: 1772224200,
                endTime: 1772231400,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 50,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699a885e93ae0db46b64878d",
                eventId: "cafeccb1c45893776dbd1377c348eed2",
                isStaff: false,
                name: "Solar Search- Blue Planet ",
                description: "QR code for Solar Search- Blue Planet",
                startTime: 1772224200,
                endTime: 1772231400,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 50,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699a88d693ae0db46b64879b",
                eventId: "5c5e07b184a2958386d481af9be28051",
                isStaff: false,
                name: "Solar Search- White Star Planet QR Code",
                description: "QR Code for Solar Search- White Star Planet",
                startTime: 1772224200,
                endTime: 1772231400,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 50,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699a892693ae0db46b6487a3",
                eventId: "001b037fd1dcf40eaa144dcd41daca72",
                isStaff: false,
                name: "Solar Search- Green Planet QR CODE",
                description: "QR Code for Solar Search- Green Planet",
                startTime: 1772224200,
                endTime: 1772231400,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [],
                isAsync: false,
                sponsor: "",
                points: 50,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd2e7da480b5ddf8d59a2",
                eventId: "fda8be0362dca09ad0c8c2d1e3d83fb2",
                isStaff: false,
                name: "Company Expo Booth #1",
                description: "QR Code Booth #1",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd316da480b5ddf8d59a8",
                eventId: "66ba0e5ebcfd358dab3380423520b6b2",
                isStaff: false,
                name: "Company Expo Booth #2",
                description: "QR Code Booth #2",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd32ada480b5ddf8d59b2",
                eventId: "27b9ae66e1b510d4f3f775559a98a251",
                isStaff: false,
                name: "Company Expo Booth #3",
                description: "QR Code Booth #3",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd337da480b5ddf8d59b8",
                eventId: "0f165092fb6f6b7c0188d3df7c55d016",
                isStaff: false,
                name: "Company Expo Booth #4",
                description: "QR Code Booth #4",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd341da480b5ddf8d59be",
                eventId: "747cb804a65ca38b00f06e1e91b8bf86",
                isStaff: false,
                name: "Company Expo Booth #5",
                description: "QR Code Booth #5",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd34eda480b5ddf8d59c5",
                eventId: "fb27d0659734cceab27faa08309cb25b",
                isStaff: false,
                name: "Company Expo Booth #6",
                description: "QR Code Booth #6",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd370da480b5ddf8d59cb",
                eventId: "36a9a6e81b6daa1396dab1cd291326fe",
                isStaff: false,
                name: "Company Expo Booth #7",
                description: "QR Code Booth #7",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd37eda480b5ddf8d59d1",
                eventId: "cb0a30cd1615e369651cd276579451ff",
                isStaff: false,
                name: "Company Expo Booth #8",
                description: "QR Code Booth #8",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd388da480b5ddf8d59d9",
                eventId: "1716a6cca0df57b1256a33bfb9305f6b",
                isStaff: false,
                name: "Company Expo Booth #9",
                description: "QR Code Booth #9",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd399da480b5ddf8d59e0",
                eventId: "acbe9af85ff9f3eed548a4116f6e1347",
                isStaff: false,
                name: "Company Expo Booth #10",
                description: "QR Code Booth #10",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd3a4da480b5ddf8d59e8",
                eventId: "f782bbb2772d0e3769f4a6aa282f3fdc",
                isStaff: false,
                name: "Company Expo Booth #11",
                description: "QR Code Booth #11",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd3aeda480b5ddf8d59ee",
                eventId: "45b9ad2a06aaefb5cb4c7a1eb60d8c15",
                isStaff: false,
                name: "Company Expo Booth #12",
                description: "QR Code Booth #12",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd3b6da480b5ddf8d59f4",
                eventId: "b07e9006cc93ef8f22bad1ac576b4880",
                isStaff: false,
                name: "Company Expo Booth #13",
                description: "QR Code Booth #12",
                startTime: 1772226000,
                endTime: 1772233200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st & 2nd Floor Atrium ",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd510da480b5ddf8d5a23",
                eventId: "9423fa49d6645b73035f3d7f8166b9be",
                isStaff: false,
                name: "Cosmic Challenge Task #1 QR Code",
                description: "QR code for Task #1\n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd52ada480b5ddf8d5a32",
                eventId: "eeb17b7f38ca1b2e006573abda2d8354",
                isStaff: false,
                name: "Cosmic Challenge Task #2 QR Code ",
                description: "QR code for Task #2\n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd535da480b5ddf8d5a38",
                eventId: "ca2c4adee34977202b9927a422e57579",
                isStaff: false,
                name: "Cosmic Challenge Task #3 QR Code ",
                description: "QR code for Task #3\n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd53eda480b5ddf8d5a3e",
                eventId: "1ea575c91c6ade2b164d5c387bceb73f",
                isStaff: false,
                name: "Cosmic Challenge Task #4 QR Code",
                description: "QR code for Task #4\n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd548da480b5ddf8d5a46",
                eventId: "4427ac393695c9ad65ad6548099db29b",
                isStaff: false,
                name: "Cosmic Challenge Task #5 QR Code ",
                description: "QR code for Task #5\n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699bd551da480b5ddf8d5a4c",
                eventId: "19be9f79419d25fbdb7b4d82175512b3",
                isStaff: false,
                name: "Cosmic Challenge Task #6 QR Code",
                description: "QR code for Task #6\n",
                startTime: 1772305200,
                endTime: 1772308800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description: "Siebel Center for Computer Science 2405",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c78e6da480b5ddf8d5de7",
                eventId: "f2b1deef697188608976154a65085985",
                isStaff: false,
                name: "Astral Exhibition - Cosmic Culture QR Code",
                description: "",
                startTime: 1772319600,
                endTime: 1772326800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 25,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c7932da480b5ddf8d5df1",
                eventId: "59ed6ee0655e84379563044e078ac7ae",
                isStaff: false,
                name: "Astral Exhibition - Frozen in Time QR Code",
                description: "",
                startTime: 1772319600,
                endTime: 1772326800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 25,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c7963da480b5ddf8d5df8",
                eventId: "bb95660442b643f5fe7bdcc1b0f8a27d",
                isStaff: false,
                name: "Astral Exhibition - Solar Soccer QR Code",
                description: "",
                startTime: 1772319600,
                endTime: 1772326800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 50,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c798eda480b5ddf8d5dff",
                eventId: "f0c0908480ae2bc7455c2c38c9f8d80f",
                isStaff: false,
                name: "Astral Exhibition - Write The Star QR Code",
                description: "",
                startTime: 1772319600,
                endTime: 1772326800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 25,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c79b7da480b5ddf8d5e06",
                eventId: "4528ef070bc50d339569a2f8f83b0f46",
                isStaff: false,
                name: "Astral Exhibition - Cloning Factory QR Code",
                description: "",
                startTime: 1772319600,
                endTime: 1772326800,
                eventType: "MINIEVENT",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                sponsor: "",
                points: 25,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c9059da480b5ddf8d5e63",
                eventId: "a3f2dd2c9022dc1ff8712868a919616f",
                isStaff: false,
                name: "RSO Expo QR Code Booth #1",
                description: "QR code Booth #1",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c906bda480b5ddf8d5e72",
                eventId: "505dc9aad48c2ea803439c9ffe4411c6",
                isStaff: false,
                name: "RSO Expo QR Code Booth #2",
                description: "QR code Booth #2",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c9076da480b5ddf8d5e79",
                eventId: "9c55432daf195748fb7e9a74a034a592",
                isStaff: false,
                name: "RSO Expo QR Code Booth #3",
                description: "QR code Booth #3",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c9083da480b5ddf8d5e86",
                eventId: "6dd16003ef167028049dbaf09f992f5d",
                isStaff: false,
                name: "RSO Expo QR Code Booth #4",
                description: "QR code Booth #4",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c908dda480b5ddf8d5e8d",
                eventId: "5d5f919a314f72afd31255df9b77104d",
                isStaff: false,
                name: "RSO Expo QR Code Booth #5",
                description: "QR code Booth #5",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c909ada480b5ddf8d5e93",
                eventId: "bfbdb4c196424fd6c65386f67bff5368",
                isStaff: false,
                name: "RSO Expo QR Code Booth #6",
                description: "QR code Booth #6",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c90a3da480b5ddf8d5e99",
                eventId: "3ab1ecabbee5dd6f6561be3ca0876b0a",
                isStaff: false,
                name: "RSO Expo QR Code Booth #7",
                description: "QR code Booth #7",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c90b0da480b5ddf8d5e9f",
                eventId: "b1201fc1367a240c1524f4783ea16409",
                isStaff: false,
                name: "RSO Expo QR Code Booth #8",
                description: "QR code Booth #8",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            },
            {
                _id: "699c90b9da480b5ddf8d5ea5",
                eventId: "da1740964c7cfce2455ef256c9ea9932",
                isStaff: false,
                name: "RSO Expo QR Code Booth #9",
                description: "QR code Booth #9",
                startTime: 1772236800,
                endTime: 1772242200,
                eventType: "OTHER",
                exp: 0,
                locations: [
                    {
                        description:
                            "Siebel Center for Computer Science 1st Floor Atrium",
                        latitude: 40.113812,
                        longitude: -88.224937
                    }
                ],
                isAsync: false,
                mapImageUrl:
                    "https://raw.githubusercontent.com/HackIllinois/adonix-metadata/refs/heads/main/maps/SiebelFloor1.png",
                sponsor: "",
                points: 10,
                isPrivate: true,
                displayOnStaffCheckIn: false,
                isMandatory: false,
                isPro: false,
                menu: []
            }
        ]
    } as any;

    return res.events as EventType[];
}
