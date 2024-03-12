import express, { json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import dbConnection from "./config/dbConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import remiderRoutes from "./routes/remiderRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Dashboard"
    })
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/lead", leadRoutes);
app.use("/api/v1/leave", leaveRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/reminder", remiderRoutes);

dbConnection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})