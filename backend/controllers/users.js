const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const joi = require("joi");
const handleAsync = require("./errorHandler");

module.exports.signup = handleAsync(async (req, res, next) => {
  const { username, email, phoneNumber, password } = req.body;

  const schema = joi.object({
    username: joi
      .string()
      .required()
      .error(new Error("Please include username"))
      .min(1),
    email: joi
      .string()
      .min(1)
      .pattern(new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      .required()
      .error(new Error("Please provide valid email")),
    phoneNumber: joi.string().min(1),
    password: joi
      .string()
      .required()
      .error(new Error("Please include password"))
      .min(1),
  });

  try {
    await schema.validateAsync({ username, email, password });
    const tempToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    let user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(String(password), 10),
      phoneNumber,
    });
    const { password, ...rest } = user.toJSON();
    res.send({ success: true, user: rest, token: tempToken });
  } catch (e) {
    throw new Error(e.message);
  }
});

module.exports.login = handleAsync(async (req, res) => {
  const user = await User.findOne({
    email: req.body.email || req.body.username,
  });

  if (!user || !bcrypt.compareSync(String(req.body.password), user.password)) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  const { password, ...rest } = user.toJSON();

  res.send({ success: true, user: rest, token });
});
