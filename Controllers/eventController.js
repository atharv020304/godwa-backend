import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { errHandler } from "../Middlewares/errHandler.js";
import Event from "../Model/event.js";


export const addEvent = asyncHandler(async (req, res, next) => {
    const { eventName, eventDates, eventTime, eventAddress } = req.body;

    if (!eventDates) {
        return next(new errHandler(400, "Event dates are required"));
    }
    if (!eventTime) {
        return next(new errHandler(400, "Event time is required"));
    }
    if (!eventAddress) {
        return next(new errHandler(400, "Event address is required"));
    }

    const event = await Event.create({
        eventName,
        eventDates,
        eventTime,
        eventAddress,
        acceptResponses:true,
    });

    res.status(201).json({
        success: true,
        message: "Event added successfully",
        event,
    });
});


export const updateEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { eventName, eventDates, eventTime, eventAddress, acceptResponses } = req.body;

    const event = await Event.findById(id);

    if (!event) {
        return next(new errHandler(404, "Event not found"));
    }

    event.eventName = eventName || event.eventName;
    event.eventDates = eventDates || event.eventDates;
    event.eventTime = eventTime || event.eventTime;
    event.eventAddress = eventAddress || event.eventAddress;
    if (acceptResponses !== undefined) {
        event.acceptResponses = acceptResponses;
    }
    event.modifiedAt = Date.now();

    await event.save();

    res.status(200).json({
        success: true,
        message: "Event updated successfully",
        event,
    });
});


export const deleteEvent = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        return next(new errHandler(404, "Event not found"));
    }

    await event.deleteOne();

    res.status(200).json({
        success: true,
        message: "Event deleted successfully",
    });
});


export const fetchEventDetails = asyncHandler(async(req,res,next)=>{
    const events = await Event.find();
    res.status(200).json(events);
})