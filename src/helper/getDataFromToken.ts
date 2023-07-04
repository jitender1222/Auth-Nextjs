
import { NextRequest } from "next/server"
import jwt from "jsonwebtoken";

export const getDataFromToken=(request:NextRequest)=>{

    try {
    const token:any=request.cookies.get("token")?.value;

    const decode:any = jwt.verify(token,process.env.TOKEN_SECRET!);

    return decode.id
    } catch (error:any) {
        throw new Error(error.message);
    }

}