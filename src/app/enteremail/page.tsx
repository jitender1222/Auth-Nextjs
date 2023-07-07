"use client";

import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";


export default function EnterMail(){

    const [loading,setLoading]=useState(false);

    const [email,setMail]=useState({
       email:""
    });

    const handleSubmit=async ()=>{

        try {
            setLoading(true);
            const response=await axios.post("/api/users/forgotPassword",email);
            setLoading(false);
            toast.success("Link Generated Successfully");
            console.log(response);  
        } catch (error:any) {
            toast.error(error.message);
            console.log(error);
        }
        
    }
    return (
    <>
    <Toaster />
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div>{loading ? "Please Wait..." : " " }</div>
    <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="email"
            value={email.email}
            onChange={(e) => setMail({...email, email: e.target.value})}
            placeholder="Enter Email"
            />
            <button onClick={handleSubmit}>Submit</button>
            </div>
    </>
    )

}

