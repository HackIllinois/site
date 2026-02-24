import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "33d8fb44",
        meta: {
            processedAt: 1700000300,
            serverId: "node-7f3a",
            region: "us-east-2",
            latency: 42
        }
    });
}
