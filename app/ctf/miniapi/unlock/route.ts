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
    const signal = url.searchParams.get("signal");

    if (!secret && !signal) {
        return NextResponse.json(
            { error: "Missing query parameter" },
            { status: 400 }
        );
    }

    if (secret && signal) {
        return NextResponse.json(
            { error: "Only one query parameter allowed" },
            { status: 400 }
        );
    }

    let param = secret ? secret : signal;
    let hiddenFlag = secret
        ? "hackctf{flag8-4p1m4573r}"
        : "hackctf{flag9-c0ngr475y0ub3477h3c7f}";

    const expected = await sha256(hiddenFlag + SERVER_SECRET);
    console.log(expected);

    if (param !== expected) {
        return NextResponse.json(
            { error: "Parameter value is incorrect" },
            { status: 400 }
        );
    }

    return NextResponse.json({
        decoded: hiddenFlag
    });
}
