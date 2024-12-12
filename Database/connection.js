import mongoose from "mongoose";

export const connection = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "GodwaAdmin"
    }).then(()=>{
        console.log("connected to database");
    }).catch(err =>{
        console.log(`Error connecting to database : ${err}`);
    })
}