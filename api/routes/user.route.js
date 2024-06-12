import express from 'express'
const router=express.Router()
 import { test, updateUser } from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'
 router.get('/',test)
 router.post('/update/:id',verifyToken,updateUser)
 export default router 