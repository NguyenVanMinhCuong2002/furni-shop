import { Router, Response, Request } from "express"
import { articlePage, getBlogs } from "../controllers/blogsControllers";

const blogRouter = Router();

const path = "/blog/";

blogRouter.get(path, getBlogs);
blogRouter.get("/article/:Id", articlePage)

export default blogRouter;