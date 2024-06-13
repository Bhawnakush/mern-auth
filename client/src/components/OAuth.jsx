import React from 'react'
import {GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
export default function OAuth() {
     const dispatch=useDispatch()
     const navigate=useNavigate();
     const handleGoogleClick=async ()=>{
        try {
            const provider=new GoogleAuthProvider();
            const auth=getAuth(app)
            const result=await signInWithPopup(auth,provider)
            //const {displayName,email,photoURL}=result.user
            const res=await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    photo:result.user.photoURL
                })
            })
            /*if(!res.ok)
                {
                    throw new Error('failed to authenticate with backend')
                }
                    */
             const data=await res.json();
             console.log(data)
             dispatch(signInSuccess(data))//wants to add this to redux tootlkit
             navigate('/')
        } catch (error) {
            console.log("could not login with google ",error)
        }
     }
  return (
    
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'> Continue with Google</button>
    
  )
}
