"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogsControllers_1 = require("../controllers/blogsControllers");
const blogRouter = (0, express_1.Router)();
const path = "/blog/";
blogRouter.get(path, blogsControllers_1.getBlogs);
blogRouter.get("/article/:Id", blogsControllers_1.articlePage);
exports.default = blogRouter;
