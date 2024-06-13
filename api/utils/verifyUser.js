
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import cookieParser from "cookie-parser";
import express from 'express';
const  app=express();
app.use(cookieParser())
app.use(express.json());
export const verifyToken =(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token)
        {
            return next(errorHandler(401,"you are not authenticated"))
        }
         jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
            if(err)
                return next(errorHandler(403,'token is not valid'))
            req.user=user;
            next();
         })
}