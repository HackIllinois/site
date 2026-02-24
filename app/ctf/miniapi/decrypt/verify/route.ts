import { NextResponse } from "next/server";

async function sha256(text: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

const SERVER_SECRET = "top-secret-key";
const RECONSTRUCTED_SECRET = "3828aa3a6033d8fb4425613627b90500";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const reconstructed = url.searchParams.get("secret");

    if (!reconstructed) {
        return NextResponse.json(
            {
                error: "Missing secret param",
                hint: "Submit reconstructed fragments as ?secret=..."
            },
            { status: 400 }
        );
    }

    if (reconstructed !== RECONSTRUCTED_SECRET) {
        return NextResponse.json(
            { error: "Incorrect secret" },
            { status: 400 }
        );
    }

    const hiddenFlag = "flag{3828aa3a6033d8fb4425613627b90500}";
    const flag = await sha256(hiddenFlag + SERVER_SECRET);

    return NextResponse.json({ flag });
}
