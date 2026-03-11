import jwt from "jsonwebtoken";

export function getUserIdFromRequest(req:Request){
    const authHeader = req.headers.get("authorization");
    if(!authHeader){
        return null;
    }
    const token = authHeader.split(" ")[1];

    try
    {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number
        };
        return decoded.userId;
    }
    catch
    {
        return null;
    }
}

export function requireUser(req:Request): number{
    const userId = getUserIdFromRequest(req);

    if(!userId){
        throw new UnauthorizedError();
    }

    return userId;

}

export function unauthorized() {
    return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
    )
}

export class UnauthorizedError extends Error{}