import React, { useState } from "react";
 import { Link ,useNavigate} from "react-router-dom";
import { signInStart,signInFailure,signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Signin() {

  const [formData,setFormData]=useState({})
  const {loading,error}=useSelector((state)=>state.user)//user is the name of slice from userSlice.js
  const navigate=useNavigate();
  const disptach=useDispatch();//dispatch is use for modifying
  const handleChange=(e)=>{
setFormData({...formData,[e.target.id]:e.target.value})
  } 
   const handleSubmit=async(e)=>{

e.preventDefault();//prevent from refreshing the page
try {
  disptach(signInStart())
  
  const res=await fetch('/api/auth/signin',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
  
    },
    body:JSON.stringify(formData)
  })
  const data=await res.json()  
  //disptach(signInSuccess(data))
  //console.log(data); 
 
  if(data.success===false)
    {
      disptach(signInFailure(data.message))
return;//if there is the failure then return back to the same page
    }
    disptach(signInSuccess(data))//signInsuccess after the checking
    navigate('/');
    
    
  
} catch (error) {
  disptach(signInFailure(error))
}

}
   
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        
        
         <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
         <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg" onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading?'laoding...':'sign in'}</button>
      </form>
      <div className="flex gap-2 mt-5"><p> Dont Have an account</p>
      <Link to='/sign-up'> <span className="text-blue-500">Sign up</span></Link></div>
      <p className="text-red-700 mt-5">{error?error||'something went wrong':""}</p>
    </div>
  );
}
