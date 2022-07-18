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

const playlistSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  songs: [songSchema],
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
