import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs'
export const test=(req,res)=>{
    //res.json({
        message:"API is working fine"
    //})
}
//update user
 export const updateUser=async(req,res,next)=>{
    if(req.user.id!==req.params.id)
        {
            return res.status(401).json("you can update only your account");
             
        }
        try {
            //check if user exist
            const user=await User.findById(req.params.id);
            if(!user)
                {
                    return res.status(404).json("user not found");

                }
            if(req.body.password)
                {
                    req.body.password=bcryptjs.hashSync(req.body.password,12);

                }
                const updatedUser=await User.findByIdAndUpdate(req.params.id,
                    {
                    $set:{
                        username:req.body.username,
                        email:req.body.email,
                        password:req.body.password,
                        profilePicture:req.body.profilePicture    //in this way we cam prevent the extra information 
                    }},
                    {new:true}//we have to add this new true if we want the updated user otherwise old user will be seen
                );
                if(!updatedUser)
                    {
                        return res.status(404).json("user not found or could not be updated")
                    }
                const {password,...rest}=updatedUser._doc;//we use this _doc when we dont want unesccessary data from the moongose 
                res.status(200).json(rest)//data sent to client
        } catch (error) {
            next(error)
        }
 }