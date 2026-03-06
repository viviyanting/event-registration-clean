import { NextResponse } from "next/server";
import { events } from "@/lib/data";

export async function GET() {
    console.log("GET /api/events");
    console.log("events : ", events);
    return NextResponse.json(events);
    
}