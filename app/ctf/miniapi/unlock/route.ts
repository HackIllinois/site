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

export async function GET(req: Request) {
    const url = new URL(req.url);
    const secret = url.searchParams.get("secret");

    if (!secret) {
        return NextResponse.json({ error: "Missing secret" }, { status: 400 });
    }

    const hiddenFlag = "flag{flag-6}";
    const expected = await sha256(hiddenFlag + SERVER_SECRET);

    if (secret !== expected) {
        return NextResponse.json({ error: "Invalid secret" }, { status: 400 });
    }

    return NextResponse.json({
        decoded: hiddenFlag
    });
}
