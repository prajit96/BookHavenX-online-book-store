const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { UserModel } = require("../models/user.model");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

//Registeration
userRouter.post("/signup", async (req, res) => {
  const { image, username, email, password, role } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email: email });
    const checkusername = await UserModel.findOne({ username: username });
    if (checkusername) {
      res.json({ available: false, message: "Username not available" });
    }
    if (existingUser) {
      res.status(200).send({ msg: "Already Registered !!", registered: false });
    } else {
      bcrypt.hash(password, +process.env.saltRounds, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err });
        }
        const user = new UserModel({
          image:
            "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
          username,
          email,
          password: hash,
          role,
        });
        await user.save();
        res.status(200).send({ message: "Registered successfully",registered: true });
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//check username availability
userRouter.get("/check-username/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      res.json({ available: false, message: "Username not available" });
    } else {
      res.json({ available: true, message: "Username available" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let checkUser = await UserModel.findOne({ email: email });
    if (!checkUser) {
      res.status(200).send({ message: "User Not Found !!", login: false });
    } else {
      bcrypt.compare(password, checkUser?.password, (error, result) => {
        if (!result) {
          res.status(200).send({ message: "Wrong Password !!" , login: false});
        } else {
          const accessToken = jwt.sign(
            {
              userID: checkUser?._id,
              username: checkUser?.username,
              role: checkUser?.role,
            },
            process.env.JWT_SECRET
          );
          res.status(200).send({
            msg: "Logged-in successfully",
            login: true,
            accessToken: accessToken,
            user: {
              _id: checkUser?._id,
              username: checkUser?.username,
              email: checkUser?.email,
              role: checkUser?.role,
            },
          });
        }
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Get a user details
userRouter.get("/:id", authMiddleware, async (req, res)=>{
  const userID = req.params.id;
  try {
    const user = await UserModel.findOne({ _id: userID });
    if (!user) {
      res.status(200).send({ msg: "User not found!" });
    }else{
      res.json(user)
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
})

//Update a User
userRouter.patch("/update/:id", authMiddleware, async (req, res) => {
  const { image, username, email, password, role } = req.body;

  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      res.status(200).send({ msg: "User not found!" ,updated: false});
    } else {
      bcrypt.hash(password, +process.env.saltRounds, async (err, hash) => {
        if (err) {
          res.status(400).send({ error: err });
        }
        const user = await UserModel.findByIdAndUpdate(
          { _id: id },
          { image, username, role, password: hash, email }
        );
        const updatedUser = await UserModel.findOne({ _id: id });
        res.status(200).send({
          updated: true,
          message: "Updated successfully",
          user: {
            _id: updatedUser?._id,
            username: updatedUser?.username,
            role: updatedUser?.role,
            email: updatedUser?.email,
          },
        });
      });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Delete a user by admin
userRouter.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  if (role === "reader" || role === "author") {
    return res.status(403).json({ message: "Access forbidden" });
  }
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: `User with _id: ${id} deleted successfully` });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//Get all users by admin
userRouter.get("/", authMiddleware, async (req, res) => {
  const { role } = req.body;
  if (role === "reader" || role === "author") {
    return res.status(403).json({ message: "Access forbidden" });
  }
  try {
    const users = await UserModel.find();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};