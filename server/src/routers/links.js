import express from "express";
import jwt from "jsonwebtoken";
import { LinkModel } from "../models/Links.js";

const router = express.Router();

router.post("/add-link", async (req, res) => {
  const { linkName, linkUrl, token, linkType } = req.body;

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

  if (!flag) {
    return res.json({ error: "User not valid" });
  }

  const id = decoded.id;

  if (linkName === null || linkName === undefined || linkName === "") {
    return res.json({ error: "Please enter a link name" });
  }

  if (linkUrl === null || linkUrl === undefined || linkUrl === "") {
    return res.json({ error: "Please enter a link URL" });
  }

  if (linkType === null || linkType === undefined || linkType === "") {
    return res.json({ error: "Please enter a link URL" });
  }

  try {
    const url = new URL(linkUrl);
  } catch (err) {
    console.log("Wrong Url");
    return res.json({ error: "Please enter a valid URL" });
  }

  const newLink = new LinkModel({ linkName, linkUrl, userId: id, linkType });
  await newLink.save();

  return res.json({ message: "Added Link Successfully" });
});

router.post("/get-links", async (req, res) => {
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

  if (!flag) {
    return res.json({ error: "User not valid" });
  }

  const links = await LinkModel.find({ userId: decoded.id });

  res.json({ links });
});

export { router as LinkRouter };
