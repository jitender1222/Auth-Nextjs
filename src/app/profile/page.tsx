"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function ProfilePage(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router=useRouter();
    const [profileData,setProfileData]=useState(false);
    const logout=async ()=>{
        try {

            await axios.get("/api/users/logout");
            toast.success("Logout Successfull");
            router.push("/login");
            
        } catch (error:any) {
            message:error.message
        }
    }

    
    async function ShowProfile(){
        const response=await axios.get("/api/users/me");
        const result=response?.data?.data;
        setProfileData(result);
    }

    useEffect(()=>{
        ShowProfile();
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-5xl text-green-500 font-bold">User Profile</h1>
            <hr />
            <div>Hey 👋 Welcome Back <span className="text-green-400 font-bold text-3xl">{profileData && profileData.username}</span></div>
            <hr />
            <div className="border border-white w-auto p-10 h-auto mt-4 rounded-lg">
                <p className="text-green-400 h-10 border-white font-bold text-center text-4xl">User Data</p>
                <p className=" mt-4 h-10 border-white font-bold">UserName: <span className="text-green-400 font-bold text-2xl">{profileData && profileData.username}</span></p>
                <p className=" h-10 border-white font-bold">Email: <span className="text-green-400 font-bold text-2xl">{profileData && profileData.email}</span></p>
            </div>
            <hr />
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={logout}>LogOut</button>
        </div>
    )
}

