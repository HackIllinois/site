import { NextResponse } from "next/server";
import { derive } from "../utils";

async function sha256(text: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

const SERVER_SECRET = derive(["LWtleQ==", "ZWNyZXQ=", "dG9wLXM="]);

export async function GET() {
    const flag = derive([
        "MX0=",
        "MW4xNHA=",
        "YWc3LW0=",
        "dGZ7Zmw=",
        "aGFja2M="
    ]);
    const hiddenFlag = derive([
        "NzNyfQ==",
        "cDFtNDU=",
        "YWc4LTQ=",
        "dGZ7Zmw=",
        "aGFja2M="
    ]);

    const secret = await sha256(hiddenFlag + SERVER_SECRET);

    return NextResponse.json({
        flag,
        secret
    });
}
