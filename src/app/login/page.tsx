"use client";
import Link from "next/link";
import React, { useEffect } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function Login(){
    const router=useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })
    const [disabledButton,setDisabledButton]=React.useState(false)

    const onLogin=async ()=>{

        try {
            const response = await axios.post("/api/users/login", user);            
            console.log(response)
            router.push("/profile")
        } catch (error:any) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setDisabledButton(false)
        }
        else{
            setDisabledButton(true)
        }
    },[user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <br />

            <label htmlFor="email">Email</label>
            <input className="rounded-lg p-2 text-black" id="email" type="text" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder="Enter Email" />

            <label htmlFor="password">Password</label>
            <input className="rounded-lg p-2 text-black" id="password" type="text" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder="Enter Password" />

            <button className="p-2 mt-6 border bg-gray-200 rounded-lg text-black" onClick={onLogin} >{disabledButton ? "NoLogin" : "LogIn"}</button>
            <Link href="/signup" className="mt-4">Didnt SignUp ? Go to SignUp</Link>
        </div>
    )
}