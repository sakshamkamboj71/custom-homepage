import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import express from "express";
import { UserModel } from "../models/users.js";

import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const plen = password.length;

  const user = await UserModel.findOne({ email });
  const usernameExist = await UserModel.findOne({ username });

  if (usernameExist) {
    return res.json({ error: "The username already exists", code: "403" });
  } else if (user) {
    return res.json({ error: "This Mail already exists", code: "403" });
  } else if (username.length < 3) {
    return res.json({
      error: "Username can't be less than 3 characters",
      code: "ul",
    });
  } else if (plen < 8 || plen > 16) {
    return res.json({
      error: "Password must be 8-16 characters long",
      code: "pl",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ username, email, password: hashedPassword });
  await newUser.save();

  return res.json({ message: "User Registered successfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ error: "The username entered does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({
      error: "Username or Password you entered is Incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_PASSWORD);
  return res.json({ token });
});

router.post("/validity", async (req, res) => {
  const { token } = req.body;

  let flag = true;

  const decoded = jwt.verify(
    token,
    process.env.SECRET_PASSWORD,
    (err, data) => {
      if (err) {
        flag = false;
        return res.json({ validity: false });
      } else {
        return data;
      }
    }
  );

  if (flag) {
    const id = decoded.id;

    const user = await UserModel.findOne({ _id: id });

    if (user === null || user === undefined) {
      return res.json({ error: "Invalid access" });
    }

    return res.json({ validity: true });
  }
});

export { router as UserRouter };
