"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeControllers_1 = require("../controllers/homeControllers");
const homeRouter = (0, express_1.Router)();
homeRouter.get("/home", homeControllers_1.homePage);
homeRouter.get("/about", homeControllers_1.aboutPage);
exports.default = homeRouter;
