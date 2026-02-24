import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        fragment: "b0b4e856121957afd0eeb",
        param: "signal",
        meta: {
            processedAt: 1700000200,
            serverId: "node-9e1f",
            region: "ap-southeast-1",
            latency: 67
        }
    });
}
