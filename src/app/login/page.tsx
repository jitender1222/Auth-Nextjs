"use client";
import Link from "next/link";
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import axios from "axios";


export default function Login(){
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    })

    const onLogin=()=>{

    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <br />

            <label htmlFor="email">Email</label>
            <input className="rounded-lg p-2" id="email" type="text" value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder="Enter Email" />

            <label htmlFor="password">Password</label>
            <input className="rounded-lg p-2" id="password" type="text" value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder="Enter Password" />

            <button className="p-2 mt-6 border bg-gray-200 rounded-lg text-black" onClick={onLogin} >SignUp Here</button>
            <Link href="/signup" className="mt-4">Didnt SignUp ? Go to SignUp</Link>
        </div>
    )
}