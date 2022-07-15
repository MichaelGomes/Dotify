import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Setup Dotenv, Express & JSON Parsing
dotenv.config();
const app = express();
app.use(express.json());

// Connect To Database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
