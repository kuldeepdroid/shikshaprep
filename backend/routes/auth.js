const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    console.log("Register request received:", req.body);
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ username, email, password: password.trim() });
    await newUser.save();

    console.log("User created", newUser);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.error("Register Error:", err);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password.trim(), user.password);

    if (!isMatch) {
      console.log("Invalid email or password");
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "5h" }
    );
    console.log("Login successfull");
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
