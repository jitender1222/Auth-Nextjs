"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function VerifyEmailPage(){

    const [token,setToken]=useState("");
    const [error,setError]=useState(false);
    const [verified,setVerified]=useState(false);

    const verifyUserEmail=async ()=>{
        
    try {

        const response=await axios.post("/api/users/verifyemail",{token});
        setVerified(true);
        toast.success("Email Verified Successfully");
        
    } catch (error:any) {
        setError(true);
        console.log(error.response.data);
    }

    }

    useEffect(()=>{

        const urlToken=window.location.search.split("=")[1];
        console.log("urlToken",urlToken)
        setToken(urlToken || "");
    },[]);

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token])

    return (
        <>
        <Toaster />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-400 text-black">{token ? `${token}`: "No Token"}</h2>
            {verified && (
                <div>
                    <p>Now You can  <button className="mt-8 text-center bg-green-400 p-4 font-bold text-black rounded-xl"><Link href="/login">
                        Login
                    </Link></button></p>
                   
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                </div>
            )}
        </div>
        </>
    )
}
