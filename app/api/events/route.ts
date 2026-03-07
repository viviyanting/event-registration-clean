import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    console.log("GET /api/events");
    const events = await prisma.event.findMany()
    // console.log("events : ", events);
    return NextResponse.json(events);
    
}