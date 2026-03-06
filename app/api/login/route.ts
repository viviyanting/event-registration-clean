import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function POST(req:Request) {
    console.log("login api called");
    const { username , password } = await req.json()

    //先假驗證，之後接DB
    if(username==="admin" && password ==="1234"){
        const token = jwt.sign(
            { username },
            process.env.JWT_SECRET!,
            { expiresIn: "1h"}
        )
        return NextResponse.json({ token })
    }

    return NextResponse.json(
        { message: "Login failed" },
        { status: 401 }
    )
    
}
