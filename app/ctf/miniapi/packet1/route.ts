import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "c5068e0aab8cc42f123",
        param: "signal",
        meta: {
            processedAt: 1700000300,
            serverId: "node-7f3a",
            region: "us-east-2",
            latency: 42
        }
    });
}
