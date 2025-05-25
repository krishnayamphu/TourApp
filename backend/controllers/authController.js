const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const appError = require("../utils/appError");

// Helper to sign JWT
const signToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
};

// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("Login request body:", req.body);
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return next(appError("Invalid email", 401));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(appError("Invalid password", 401));
    const token = signToken(user);

    res.status(200).json({
      status: "success",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Register a new user
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return next(appError("Email already exists", 400));

    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      status: "success",
      message: "User registered",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
};
