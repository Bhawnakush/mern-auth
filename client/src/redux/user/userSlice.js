 import { createSlice } from "@reduxjs/toolkit";//slice is the piece of state
  const initialState={
    currentUser:null,
    loading:false,
    error:false
  }
   const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=false;

        },
        updateUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
   })
   export const {signInFailure,signInStart,signInSuccess,updateUserFailure,updateUserStart,updateUserSuccess}=userSlice.actions
   export default userSlice.reducer