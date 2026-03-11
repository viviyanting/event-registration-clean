//【API-活動詳細頁】取消報名
import { NextResponse } from "next/server";
import { requireUser,UnauthorizedError } from "@/lib/auth";
import prisma from "@/lib/prisma";

type Params = {
    params:{
        id:string;
    };
};

export async function POST(request:Request,{params}:Params) {
    var userId = 0;
    try
    {
        //取得user資料
        userId = requireUser(request);

    }
    catch(error)
    {
        if(error instanceof UnauthorizedError){
            return Response.json(
                { error: "UNAUTHORIZED" },
                { status: 401 }
            );
        }
        return Response.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
    
    //確認活動存在
    const event = await prisma.event.findUnique({
        where: { id: Number(params.id) }
    });
    if(!event){
        return NextResponse.json(
            { message:"活動不存在" },
            { status:404 }
        );
    }

    //修改報名資料
    try
    {
        await prisma.registration.deleteMany(
            {
                where:{
                    userId: Number(userId), 
                    eventId: Number(params.id)
                }
            }
        )

        //整理資料再傳到Client
        const  Event = {
          id: Number(params.id),
          title: event?.title,
          content: event?.content,
          isRegistered: false
        };

        console.log("已取消報名",event);
        return NextResponse.json(Event);
    }
    catch(error)
    {
        return Response.json(
            { message: "已取消報名" },
            { status: 400 }
        )
    }  
}