import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import adminRouter from "./Routes/adminRoutes.js";
import { connection } from "./Database/connection.js";
import { errHandler, errorMiddleware } from "./Middlewares/errHandler.js"; // Import global error handler

const app = express();

// Configure dotenv
config({ path: "./config/config.env" });

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Admin Routes
app.use("/api/v1/admin", adminRouter);

// Database connection
connection();

// Global error handler
app.use(errorMiddleware);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
