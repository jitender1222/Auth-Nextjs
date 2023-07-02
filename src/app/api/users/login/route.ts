import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()


export async function POST(request: NextRequest){

    try {
        const reqBody=await request.json();
        const {email,password}=reqBody;

        if(email || !password) {
            return NextResponse.json({
                message:"All fields are required",
                status:500
            })
        }

        // check if the user exist or not 

        const user=await User.findOne({email})

        if(!user){
            return NextResponse.json({
                error:"User Does not Exist",
                status:400
            })
        }

        // check for password

        const validPassword=await bcryptjs.compare(password,user.password);

        if(!validPassword) {
            return NextResponse.json({
                error:"Invalid Password",
                status:400
            })
        }

        // create token data

        const tokenData={
            _id:user.id,
            username:user.username,
            email:user.email
        }

        // create token

        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"30d"});

        const response=NextResponse.json({
            success:true,
            message:"Login Successfull",
        })

        response.cookies.set("token",token,{
            httpOnly:true
        })

        return response;


    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:400
        })
    }
}