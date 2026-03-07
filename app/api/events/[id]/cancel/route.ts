import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
    params:{
        id:string;
    };
};

export async function POST(req:Request,{params}:Params) {
    const event = await prisma.event.findUnique({
        where: { id: Number(params.id) }
    });
    if(!event){
        return NextResponse.json(
            { message:"活動不存在" },
            { status:404 }
        );
    }
    
    // event.isRegistered = false;
    // return NextResponse.json({
    //     message:"已取消報名",
    //     event,
    // });
}