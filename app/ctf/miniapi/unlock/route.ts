import { NextResponse } from "next/server";
import { derive } from "../../utils";

async function sha256(text: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);

    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

const SERVER_SECRET = derive(["LWtleQ==", "ZWNyZXQ=", "dG9wLXM="]);

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
        ? derive(["NzNyfQ==", "cDFtNDU=", "YWc4LTQ=", "dGZ7Zmw=", "aGFja2M="])
        : derive([
              "fQ==",
              "aDNjN2Y=",
              "YjM0Nzc=",
              "NzV5MHU=",
              "MG5ncjQ=",
              "YWc5LWM=",
              "dGZ7Zmw=",
              "aGFja2M="
          ]);

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
