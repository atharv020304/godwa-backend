import mongoose, { mongo } from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName:{
        type: String,
    },
    eventDates:{
        type: String,
        required:true,
    },
    eventTime:{
        type:String,
        required:true,
    },
    eventAddress:{
        type:String,
        required:true,
    },
    acceptResponses:{
        type:Boolean,
        default:true
    },
    modifiedAt:{
        type:Date,
        default: Date.now,
    }
})


const Event = mongoose.model("Event",eventSchema);

export default Event;