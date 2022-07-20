import mongoose from "mongoose";

const songSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  artists: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  music: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
