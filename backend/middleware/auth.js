import jwt from "jsonwebtoken"
import { trusted } from "mongoose";

const authMiddleware = async (req,res,next) =>{  
    const {token} = req.headers;
    if (!token) {
        return res.json({success:false,message:"not Authorixed login agen"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"erorr"})
    }
}

export default authMiddleware;