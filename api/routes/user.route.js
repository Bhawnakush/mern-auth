import express from 'express'
const router=express.Router()
 import { test, updateUser,deleteUser } from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
 router.get('/',test)
 router.post('/update/:id',verifyToken,updateUser)
 router.delete('/delete/:id',verifyToken,deleteUser)
 export default router 