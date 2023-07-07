import nodemailer from "nodemailer";

import User from "@/models/userModel";

import bcryptjs from "bcryptjs";

export const sendMail=(async ({email,emailType,userId}:any)=>{

    try {

        // create a hashed token

        const hashedToken=await bcryptjs.hash(userId.toString() ,10);

        if(emailType==="VERIFY"){
            
            await User.findByIdAndUpdate(userId,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }
        else if(emailType==="RESET"){

            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "f6a40df72e1717",
              pass: "027028856c3b45"
            }
          });

          const mailOptions={

            from:"jitender@gmail.com",
            to:email,
            subject: emailType==="VERIFY" ? "Verify your email " : "RESET Your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType==="VERIFY" ? "verifyemail?token" : "newPassword?token"}=${hashedToken}"> here </a>to ${emailType==="VERIFY"? "Verify Your Email":"RESET Your Password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/newPassword?token=${hashedToken}
            </p>`
          }

          const mailResponse=await transport.sendMail(mailOptions);

          return mailResponse
        
    } catch (error) {
        console.log(error);
    }
})