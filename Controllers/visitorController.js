import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { errHandler, errorMiddleware } from "../Middlewares/errHandler.js";
import Event from "../Model/event.js";
import Visitor from "../Model/visitor.js";


export const RegisterForEvent = asyncHandler(async(req,res,next)=>{
        const {eventId} = req.params;
        const {name,organizationName,designation,phone,email,city,source,otherSourceDetails} = req.body;

        const eventInstance = await Event.findById(eventId);
        if(!eventInstance){
            return next(new errHandler("400","event not found"));
        }
        if(!name || !phone){
            return next(new errHandler("400","Please fill all the fields"));
        }
        const ifexits = await Visitor.findOne({phone});
        if(ifexits){
            return next(new errHandler("400","Visitor already exists with this phone number"));
        }
        const ifemail = await Visitor.findOne({email});
        if(ifemail){
            return next(new errHandler("400","Visitor already exists with this email"));
        }
        if(!source && !otherSourceDetails){
            return next(new errHandler("400","Please fill either source or other source details"));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return next(new errHandler(400, "Invalid email format"));
        }

        const visitor = new Visitor({
            name,
            organizationName,
            designation,
            phone,
            email,
            city,
            source,
            otherSourceDetails,
            event: eventId,
        })

        await visitor.save();

        res.status(200).json({message:"Registeration for the event Successful !",visitor})


});
