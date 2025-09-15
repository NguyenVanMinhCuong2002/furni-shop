import { Request, Response } from "express";

const layout = "layouts/main"
const path = "pages/"


const homePage = (req: Request, res: Response) => {
    return res.render(path + "index", { layout: layout})
}


const aboutPage = (req: Request, res: Response) => {
    return res.render(path + "about", { layout: layout})
}


export {
    homePage, 
    aboutPage
}