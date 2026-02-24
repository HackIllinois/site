import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "28aa3a60",
        meta: {
            processedAt: 1700000200,
            serverId: "node-9e1f",
            region: "ap-southeast-1",
            latency: 67
        }
    });
}
