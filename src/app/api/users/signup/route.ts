import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect()


export async function POST(request: NextRequest){

    try {
        const reqBody=await request.json();
        const {username,email,password}=reqBody;

        // console.log(reqBody)

        if(!username || !email || !password) {
            
            return NextResponse.json({
                message:"All fields are required",
                status:500
            })
        }


        // check if the user exist or not 

        const user=await User.findOne({email})

        if(user){
            return NextResponse.json({
                error:"User Already Exist",
                status:500
            })
        }

        // console.log("user",user)

        // hash password

        const salt=await bcryptjs.genSalt(10)
        const hashedPassword=await bcryptjs.hash(password,salt);

        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })

        const saveUser=await newUser.save();

        return NextResponse.json({
            success:true,
            message:"User saved successfully",
            saveUser
        })


    } catch (error:any) {
        return NextResponse.json({
            error:error.message,
            status:500
        })
    }
}