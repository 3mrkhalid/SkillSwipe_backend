import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import DBconn from "./config/dbconn.js"; 
import rootRouter from "./routes/root.js"
import authRouter from "./routes/Auth.js";
import { corsOptions } from "./config/corsOptions.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log("You are in development mode");
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// REST API routes placeholder

app.use('/', rootRouter)
app.use('/api/v1/', authRouter)

// Connect to DB and start server
const startServer = async () => {
    try {
        await DBconn(); // DB connection
        
        app.listen(port, () => {
                console.log(`Server is running on http://localhost:${port}`);
        });
        
        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });

    } catch (err) {
        console.error("Failed to connect to DB", err);
        process.exit(1); 
    }
};

startServer();