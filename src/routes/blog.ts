import { Router, Response, Request } from "express"
import { getBlogs } from "../controllers/blogsControllers";

const blogRouter = Router();

const path = "/blog/";

blogRouter.get(path, getBlogs);

export default blogRouter;