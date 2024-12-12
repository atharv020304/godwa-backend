import express from "express"
import { isAuth } from "../Middlewares/authMiddleware.js"
import { Login, Logout, Register } from "../Controllers/admincontroller.js";

const adminRouter = express.Router();

adminRouter.post('/register',Register);
adminRouter.post('/login',Login);
adminRouter.get('/logout',isAuth,Logout)


export default adminRouter;