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

export async function GET() {
    const flag = "hackctf{flag7-m1n14p1}";
    const hiddenFlag = "hackctf{flag8-4p1m4573r}";

    const secret = await sha256(hiddenFlag + SERVER_SECRET);

    return NextResponse.json({
        flag,
        secret
    });
}
