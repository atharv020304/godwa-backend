import {Admin} from "../Model/admin.js"
import { asyncHandler } from "./asyncHandler.js"
import { errHandler } from "./errHandler.js"
import jwt from "jsonwebtoken"


export const isAuth = asyncHandler(async(req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return next(new errHandler(400,"User not Authenticated"));
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

    req.user = await Admin.findById(decoded.id)

    next()

});