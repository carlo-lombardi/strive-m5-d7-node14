import express from "express";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 } from "cloudinary";

const app = express.Router();
// - CommentID //Server Generated
// - Date //Server Generated

const commentsPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data/comments.json"
);

app.get("/", async (req, res, next) => {
  try {
    const comments = await fs.readJSON(commentsPath);
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const comments = await fs.readJSON(commentsPath);
    const newComment = { ...req.body, commentID: uniqid(), date: new Date() };
    comments.push(newComment);
    await fs.writeJSON(commentsPath, comments);
    res.send({ status: "ok" });
  } catch (error) {
    console.log(error);
  }
});

export default app;
