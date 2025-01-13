import { requestv2 } from "@/util/api";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file || !file.name) {
        return NextResponse.json(
            { error: "No file provided" },
            { status: 400 }
        );
    }

    const { url, fields } = await requestv2("GET", "/s3/upload");
    let data = new FormData();
    for (let key in fields) {
        data.append(key, fields[key]);
    }
    data.append("file", file, file.name);
    const result = await fetch(url, { method: "POST", body: data });

    if (!result.ok) {
        const errorBody = await result.text();
        return NextResponse.json({ error: errorBody }, { status: 500 });
    }

    const body = await result.text();
    return NextResponse.json({ message: body });
}
