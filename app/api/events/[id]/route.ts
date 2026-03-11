//【API-活動詳細頁】取得活動詳細資料
import prisma from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }) 
  {
    //解析token取得user資料
    const userId = getUserIdFromRequest(request);
    
    //取得活動詳細資料
    const event = await prisma.event.findUnique({
      where: {
        id: Number(params.id)
      },

      include: { 
        registrations: true
      }
    });

    if(!event){
      return Response.json(
        { message: "not found" },
        { status: 404 }
      );
    }

    //判斷是否報名
    const isRegistered = event?.registrations.some(
    r => r.userId === Number(userId)
  )

  //整理資料再傳到Client
  const  Event = {
    id: Number(params.id),
    title: event?.title,
    content: event?.content,
    isRegistered: isRegistered
  };

  return Response.json(Event);
}
