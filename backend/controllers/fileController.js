import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import Grid from "gridfs-stream";
import mongoose from "mongoose";

dotenv.config();

//Create a new mongo connection
const conn = mongoose.createConnection(process.env.MONGO_URI);

let gfs, gridfsBucket;

conn.once("open", () => {
  //Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

// @desc   Get Image by filename
// @route  GET /api/files/image/:filename
// @access Public
const getImageByName = asyncHandler(async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        error: "File does not exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gridfsBucket.openDownloadStream(file._id);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        error: "Not an image",
      });
    }
  });
});

export { getImageByName };
