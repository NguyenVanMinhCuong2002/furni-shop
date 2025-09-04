import { Router, Request, Response } from "express";
import { aboutPage, homePage } from "../controllers/homeControllers";

const homeRouter = Router();

homeRouter.get("/home", homePage);
homeRouter.get("/about", aboutPage);


export default homeRouter;