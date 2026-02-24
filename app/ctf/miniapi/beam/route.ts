import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const access = req.headers.get("X-CTF-Access");

    if (access !== "granted") {
        return NextResponse.json(
            {
                error: "Access denied",
                hint: "Try again with header X-CTF-Access: granted"
            },
            { status: 401 }
        );
    }

    return NextResponse.json({ flag: "flag{flag-11}" });
}
