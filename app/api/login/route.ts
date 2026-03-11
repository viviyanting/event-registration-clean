//【API-登入頁】
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma";

export async function POST(req:Request) {
    const { username , password } = await req.json()

    //帳號驗證
    const user = await prisma.user.findUnique({
        where: { username }
    })

    if(!user || user.password !==password){
        return NextResponse.json(
        { message: "Login failed" },
        { status: 401 })
    }

    //簽入token
    const token = jwt.sign(
            { 
                userId: user.id,
                username: user.username
             },
            process.env.JWT_SECRET!,
            { expiresIn: "1h"}
        )
    return NextResponse.json({ token })
}
