import { asyncHandler } from "../Middlewares/asyncHandler.js";
import { errHandler } from "../Middlewares/errHandler.js";
import { Admin } from "../Model/admin.js";
import { sendToken } from "../Utils/jwtToken.js";

export const Register = asyncHandler(async (req, res, next) => {

    const { username, password } = req.body;

    if (!username) {
        return next(new errHandler(400, "Username is required"));
    }

    if (!password) {
        return next(new errHandler(400, "Password is required"));
    }

    const exists = await Admin.findOne({ username });
    if (exists) {
        return next(new errHandler(400, "Username already taken"));
    }

    const admin = {
        username, password
    };

    const adminRes = await Admin.create(admin);
    sendToken(adminRes, 201, res, "Admin registered successfully");
});

export const Login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(new errHandler(400, "All fields are required"));
    }

    const user = await Admin.findOne({ username }).select("+password");

    if (!user) {
        return next(new errHandler(400, "Invalid username or password"));
    }

    const isPassword = await user.comparePassword(password);
    if (!isPassword) {
        return next(new errHandler(400, "Invalid username or password"));
    }

    sendToken(user, 200, res, "Admin logged in successfully");
});

export const Logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully"
    });
});
