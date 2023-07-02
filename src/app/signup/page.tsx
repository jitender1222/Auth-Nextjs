"use client";
import Link from "next/link";
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignUp(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        username:"",
        email:"",
        password:"",
    })
    const [disabledButton,setDisabledButton]=React.useState(false)

    const onSignUp=async ()=>{
        try {
            const response = await axios.post("/api/users/signup", user);            
            console.log(response)
            router.push("/login")
        } catch (error:any) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setDisabledButton(false)
        }
        else{
            setDisabledButton(true)
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>SignUp</h1>
            <br />

            <label htmlFor="username">UserName</label>
            <input className="rounded-lg p-2 text-black" id="username" type="text" value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})} placeholder="Enter UserName" />

            <label htmlFor="email">Email</label>
            <input className="rounded-lg p-2 text-black" id="email" type="text" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder="Enter Email" />

            <label htmlFor="password">Password</label>
            <input className="rounded-lg p-2 text-black" id="password" type="text" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder="Enter Password" />

            <button className="p-2 mt-6 border bg-gray-200 rounded-lg text-black" onClick={onSignUp} >{disabledButton ? "NoSignUp" : "SignUp"}</button>
            <Link href="/login" className="mt-4">Already SignUp ? Go to Login</Link>
        </div>
    )
}