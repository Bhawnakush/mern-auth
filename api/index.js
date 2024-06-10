import express from 'express'
 import mongoose from 'mongoose' 
 import cors from 'cors'
  import dotenv from 'dotenv'
  dotenv.config();
  import bcryptjs from 'bcryptjs'
 mongoose.connect(process.env.MONGO,{useNewUrlParser:true}).then(()=>{console.log("connected to database")}).catch((error)=>{console.log(error)})
 const app=express();
  import userRoutes from './routes/user.route.js'
  import userAuth from './routes/auth.route.js'
 app.use(express.json());
 app.use(cors())

  app.use('/api/user',userRoutes)
  app.use('/api/auth',userAuth)
  app.listen(3000,()=>{
    console.log("server is running fine")
  })
   app.use((err,req,res,next)=>{
    const statusCode=err.statuCode||500;
    const message=err.message||'Internal server error'
return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
})
   })