import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken"

type Params = {
    params:{
        id: string;
    };
};

export async function POST(req:Request, {params}:Params) {
    console.log("register API被呼叫");

    const authHeader = req.headers.get("authorization");

    if(!authHeader){
        return NextResponse.json(
            { message: "未登入" },
            { status: 401 }
        );
    }

    const token = authHeader.split(" ")[1];
    const userId = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number;
        };

    try{
        jwt.verify(token, process.env.JWT_SECRET!);
    }
    catch(error){
        return NextResponse.json(
            { message: "token無效" },
            {status: 401 }
        );
    }

    console.log("event id : ",params.id);
    const event = await prisma.event.findUnique({
        where: { id: Number(params.id)}
    })
    if(!event){
        console.log("找不到活動");
        return NextResponse.json(
            { message:"活動不存在" },
            { status:404 }
        );
    }

    try
    {
        await prisma.registration.create(
            {
                data: {
                    userId: Number(userId),
                    eventId: Number(params.id)
                }
            }
        )

    }
    catch(error)
    {
        return Response.json(
            { message: "already registered" },
            { status: 400 }
        )
    }

    // event.isRegistered = true;
    // console.log("報名完成",event);
    // return NextResponse.json({
    //     message:"報名成功",
    //     event,
    // });
}



    