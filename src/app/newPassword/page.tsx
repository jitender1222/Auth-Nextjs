"use client";

// import axios from "axios";
// import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import { Toaster } from "react-hot-toast";

// export default function VerifyEmailPage(){

//     const [token,setToken]=useState("");
//     const [error,setError]=useState(false);
//     const [verified,setVerified]=useState(false);
//     const router=useRouter();
//     const [password,setPassword]=useState({
//         password:""
//     });
//     const [confirmPassword,setConfirmPassword]=useState({
//         confirmPassword:""
//     });

//     const verifyUserPassword=async ()=>{
        
//     try {

//         const response=await axios.post("/api/users/verifynewpassword",{password,confirmPassword,token});
//         if(response?.data?.success){
//         toast.success("Password Changed Successfully");
//         router.push("/login");
//         console.log("response for Password",response);
//         }
        
//     } catch (error:any) {
//         setError(true);
//         console.log(error.response.data);
//     }

//     }

//     useEffect(()=>{

//         const urlToken=window.location.search.split("=")[1];
//         console.log("urlToken",urlToken)
//         setToken(urlToken || "");
//     },[]);

//     // useEffect(()=>{
//     //     if(token.length>0){
//     //         verifyUserPassword();
//     //     }
//     // },[token])

//     const handleSubmit = (e:any) => {
//         e.preventDefault();
//         verifyUserPassword();
//       };
    

//     return (
//         <>
//         <Toaster />
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">

//             <p>{token}</p>

//             <h1 className="text-4xl">New Password</h1>
//             {/* <h2 className="p-2 bg-orange-400 text-black">{token ? `${token}`: "No Token"}</h2> */}
            
//             <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="email"
//             type="email"
//             value={password.password}
//             onChange={(e) => setPassword({...password, password: e.target.value})}
//             placeholder="Enter New Password"
//             />
//             <input 
//         className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
//             id="email"
//             type="email"
//             value={confirmPassword.confirmPassword}
//             onChange={(e) => setConfirmPassword({...confirmPassword, confirmPassword: e.target.value})}
//             placeholder="Enter Confirm Password"
//             />
//             <button onClick={handleSubmit}>Submit</button>
//             {error && (
//                 <div>
//                     <h2 className="text-2xl bg-red-500 text-black">Error</h2>
//                 </div>
//             )}
//         </div>
//         </>
//     )
// }


import axios from "axios";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const router=useRouter();
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const verifyUserPassword = async () => {
    try {
      const response = await axios.post("/api/users/verifynewpassword", {
        password,
        confirmPassword,
        token,
      });

      if (response?.data?.success) {
        toast.success("Password Changed Successfully");
        console.log("response for Password", response);
        router.push("/login");
      }
    } catch (error:any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log("urlToken", urlToken);
    setToken(urlToken || "");
  }, []);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    verifyUserPassword();
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <p>{token}</p>
        <h1 className="text-4xl">New Password</h1>

        <form onSubmit={handleSubmit}>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter New Password"
            required
          />

          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter Confirm Password"
            required
          />

          <button type="submit">Submit</button>
        </form>

        {error && (
          <div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
          </div>
        )}
      </div>
    </>
  );
}
