import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
  linkName: { type: String, required: true },
  linkUrl: { type: String, required: true },
  linkType: { type: String, required: true },
  userId: { type: String, required: true },
});

export const LinkModel = new mongoose.model("links", LinkSchema);
