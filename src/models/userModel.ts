import mongoose from "mongoose";

const userSchema= new mongoose.Schema({

    username:{
        type:String,
        required:[true,"Name required"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email required"],
        unique:true,
    },
    passsword:{
        type:String,
        required:[true,"Password required"],
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User; 