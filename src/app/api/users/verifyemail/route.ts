import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";


connect();

export async function POST (request:NextResponse){

    try {

        const reqBody=await request.json();
        const {token}=await reqBody
        console.log(token);

        const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
        console.log("user",user);

        if(!user){

            return NextResponse.json({
                message:"Invalid token",
                status:400
            })
        }

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();

        return NextResponse.json({
            message:"Email verified successfully",
            success:true,
            user
        })
        
        
    } catch (error:any) {
        return NextResponse.json({
            message:error.message,
            status:500
        })
    }
}
