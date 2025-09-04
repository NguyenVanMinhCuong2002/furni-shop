import { Request, Response } from "express";

const pages = "pages/blog"
const layout = "layputs/main"

const blogs = (req: Request, res: Response) => {
    return res.render(pages, { layout: layout})
}

const articles = (req: Request, res: Response) => {
    return res.render(pages, { layout: layout})
}

export {
    blogs, 
    articles
}