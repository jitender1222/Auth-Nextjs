import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";
import bcryptjs from "bcryptjs";



export async function POST (request:NextResponse){

    try {
     
    const reqBody=await request.json();
    const {password,confirmPassword,token}=reqBody;

    if(!token){
        return NextResponse.json({
            success:"false",
            message:"token is not present"
        })
    }

    if(password.length !== confirmPassword.length){
        return NextResponse.json({
            success:false,
            message:"both password should be same"
        })
    }

    if(password!==confirmPassword){
        return NextResponse.json({
            success:false,
            message:"Password is not correct"
        })
    }

    const user =await User.findOne({forgotPasswordToken:token,forgotPasswordTokenExpiry:{$gt:Date.now()}}).exec();

    if(!user){
        return NextResponse.json({
            message:"Invalid token",
            status:400
        })
    }

    console.log("user in verify password",user);

    const hashedPassword=await bcryptjs.hash(password,10);

     // Update the user's password in the database
     user.password = hashedPassword;
     await user.save();
 
     // Return a success response
     return NextResponse.json({
       success: true,
       message: "Password updated successfully",
     });

    } catch (error:any) {
        console.log(error)
        toast.error(error.message)
    }
    
}