import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }) 
  {
    //解析token取得user資料
    const authHeader = request.headers.get("authorization");
    let userId = null;
    if(authHeader){
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: number
      };
      userId = decoded.userId;
    }

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

  const isRegistered = event?.registrations.some(
    r => r.userId === Number(userId)
  )

  const  Event = {
    event_id: Number(params.id),
    userId:Number(userId),
    title: event?.title,
    content: event?.content,
    isRegistered: isRegistered
};

  return Response.json(Event);
}
