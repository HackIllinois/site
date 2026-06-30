import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "ee3111b1dd03a7",
        param: "signal",
        meta: {
            processedAt: 1700000400,
            serverId: "node-1a4d",
            region: "eu-central-1",
            latency: 91
        }
    });
}
