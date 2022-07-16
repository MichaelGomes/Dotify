import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import generateEmailToken from "../utils/generateEmailToken.js";
import sendVerifyEmail from "../utils/sendVerifyEmail.js";

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, remember } = req.body;

  const user = await User.findOne({ email: email });

  if (user?.verified === false) {
    res.status(401);
    throw new Error("Verify your email to login");
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      token: generateToken(user._id, remember),
      playlists: user.playlists,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register a new user
// @route  POST /api/users/login
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      playlists: user.playlists,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Update user profile
// @route  PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      verified: true,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc   Send verification email
// @route  POST /api/users/verify
// @access Private
const verifyUserEmailSend = asyncHandler(async (req, res) => {
  const { email, id } = req.body;

  const emailToken = generateEmailToken(id);

  sendVerifyEmail(emailToken, email);

  res.json("Verification email has been sent to " + email);
});

// @desc   Verify Email
// @route  GET /api/users/verify/:token
// @access Private
const verifyAccount = asyncHandler(async (req, res) => {
  try {
    //Verify Token
    const id = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    //Find User
    const user = await User.findById(id.id);
    //Verify User
    user.verified = true;
    await user.save();

    res.json(user.email + " has been verified!");
  } catch (error) {
    throw new Error(error);
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  verifyUserEmailSend,
  verifyAccount,
};
