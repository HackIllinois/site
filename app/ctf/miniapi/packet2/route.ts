import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "7dd09094d1380",
        param: "signal",
        meta: {
            processedAt: 1700000100,
            serverId: "node-2b9c",
            region: "us-west-1",
            latency: 38
        }
    });
}
