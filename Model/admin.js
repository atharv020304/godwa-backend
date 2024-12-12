import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const adminSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minLength:[3,"Name must be atleast 3 characters"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8,"minimum 8"],
        select: false
    }
})


adminSchema.pre("save",async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,5)
})


adminSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


adminSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: "5h",
    })
}


export const Admin = mongoose.model("Admin",adminSchema)