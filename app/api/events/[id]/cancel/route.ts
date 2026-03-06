import { NextResponse } from "next/server";
import { events } from "@/lib/data";

type Params = {
    params:{
        id:string;
    };
};

export async function POST(_:Request,{params}:Params) {
    const event = events.find((e)=>e.id===params.id);
    if(!event){
        return NextResponse.json(
            { message:"活動不存在" },
            { status:404 }
        );
    }
    
    event.isRegistered = false;
    return NextResponse.json({
        message:"已取消報名",
        event,
    });
}