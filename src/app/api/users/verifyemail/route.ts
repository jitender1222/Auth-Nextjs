import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();

export async function POST (request:NextResponse){

    try {

        const reqBody=await request.json();
        const {token}=await reqBody
        console.log(token);

        User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        
        
    } catch (error:any) {
        return NextResponse.json({
            message:error.message,
            status:500
        })
    }
}
