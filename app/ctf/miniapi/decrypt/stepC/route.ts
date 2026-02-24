import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "25613627b90500",
        meta: {
            processedAt: 1700000400,
            serverId: "node-1a4d",
            region: "eu-central-1",
            latency: 91
        }
    });
}
