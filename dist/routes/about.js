"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aboutRouter = (0, express_1.Router)();
const path = "/about/";
aboutRouter.get("/about", (req, res) => {
    return res.render("pages/about", { title: "Trang chủ", message: "Xin chào MVC với TypeScript!" });
});
exports.default = aboutRouter;
