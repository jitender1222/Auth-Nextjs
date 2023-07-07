import { NextResponse,NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendMail } from "@/helper/mailer";

connect();


export async function POST(request: NextResponse) {
    try {
      const response = await request.json();
      const { email } = response;
      console.log(email);
  
      const user = await User.findOne({ email });
      console.log("user",user)
  
      if (!user) {
        return NextResponse.json({
          success: false,
          message: "User not found",
          status: 400,
        });
      }
  
      await sendMail({ email, emailType: "RESET", userId: user._id });
  
      return NextResponse.json({
        success: true,
        message: "Email sent successfully",
        status: 200,
      });
    } catch (error: any) {
      return NextResponse.json({
        success: false,
        message: error.message,
        status: 500,
      });
    }
  }
  
  
  
  
  
  
  