import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import adminRouter from "./Routes/adminRoutes.js";
import { connection } from "./Database/connection.js";
import { errHandler, errorMiddleware } from "./Middlewares/errHandler.js"; 
import eventRouter from "./Routes/eventRoutes.js";
import cors from "cors"
const app = express();

// Configure dotenv
config({ path: "./config/config.env" });

app.use(cors({ origin: "http://localhost:3000" }));
// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Admin Routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/event", eventRouter);

// Database connection
connection();

// Global error handler
app.use(errorMiddleware);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
