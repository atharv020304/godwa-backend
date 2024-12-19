import express from "express"
import { isAuth } from "../Middlewares/authMiddleware.js"
import { addEvent, deleteEvent,updateEvent } from '../Controllers/eventController.js'

const eventRouter = express.Router();

eventRouter.post('/add',addEvent);
eventRouter.post('/update/:id',isAuth,updateEvent);
eventRouter.delete('/delete/:id',isAuth,deleteEvent);

export default eventRouter;