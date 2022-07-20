import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import songRoutes from "./routes/songRoutes.js";

// Setup Dotenv, Express & JSON Parsing
dotenv.config();
const app = express();
app.use(express.json());

// Connect To Database
connectDB();

//Routes
app.use("/api/users", userRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/songs", songRoutes);

//Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
