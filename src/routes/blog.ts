import { Router, Response, Request } from "express"

const blogRouter = Router();

const path = "/blog/";

blogRouter.get(path, (req: Request, res: Response) => {
    return res.render("pages/blog", { layout: "layouts/main"})
});

export default blogRouter;