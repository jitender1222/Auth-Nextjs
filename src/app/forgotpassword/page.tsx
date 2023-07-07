"use client";

// import User from "@/models/userModel";
// import axios from "axios";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function ForgotPasswordPage(){

    const [updatePassword,setUpdatePassword]=useState({
        password:""
    });
    return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={updatePassword.password}
            onChange={(e) => setUpdatePassword({...updatePassword, password: e.target.value})}
            placeholder="Enter Your New Password"
            />
    </div>
    </>)
}