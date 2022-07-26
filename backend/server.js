import path from "path";
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

const __dirname = path.resolve();

//Makes build folder static
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  //Runs if any route that is not a route listed above
  //Will point to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
}

//Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
