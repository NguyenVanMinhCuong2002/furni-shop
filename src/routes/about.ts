import { Router, Response, Request } from "express"

const aboutRouter = Router();

const path = "/about/";

aboutRouter.get("/about", (req: Request, res: Response) => {
    return res.render("pages/about", { title: "Trang chủ", message: "Xin chào MVC với TypeScript!" })
});

export default aboutRouter;