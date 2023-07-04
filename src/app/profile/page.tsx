"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function profilePage(){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router=useRouter();
    const logout=async ()=>{
        try {

            await axios.get("/api/users/logout");
            toast.success("Logout successfull");
            router.push("/login");
            
        } catch (error:any) {
            message:error.message
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" onClick={logout}>
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">LogOut</button>
        </div>
    )
}

