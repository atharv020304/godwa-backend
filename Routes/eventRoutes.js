import express from "express"
import { isAuth } from "../Middlewares/authMiddleware.js"
import { addEvent, deleteEvent,fetchEventDetails,updateEvent } from '../Controllers/eventController.js'
import { RegisterForEvent } from "../Controllers/visitorController.js";

const eventRouter = express.Router();

eventRouter.post('/add',addEvent);
eventRouter.post('/update/:id',isAuth,updateEvent);
eventRouter.get('/getevent',fetchEventDetails)
eventRouter.delete('/delete/:id',isAuth,deleteEvent);
eventRouter.post('/register/:eventId',RegisterForEvent)

export default eventRouter;