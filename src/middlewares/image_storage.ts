import express, { Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/uploads/"); // thư mục uploads
  },
  filename: (req, file, cb) => {
    // Đặt tên file = timestamp-originalname
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    // Chỉ cho phép file ảnh
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

export default upload