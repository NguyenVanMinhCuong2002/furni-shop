import { Request, Response } from "express";
import { createArticleHandle, getArticleHandle, getListArticleHanle } from "../services/blogsService"

const pages = "pages/blog"
const layout = "layouts/main"


const getBlogs = async (req: Request, res: Response) => {

    const articles = await getListArticleHanle()

    return res.render(pages, {layout: layout, articles: articles})
}



const createArticle = (req: Request, res: Response) => {

    try {

        const {title, content, author_id } = req.body
        const article = createArticleHandle(title, content, author_id)

        return res.redirect("articles")
    } catch (error) {

        console.log("Error:", error.message)

    }

}



const articlePage = async (req: Request, res: Response) =>{
    try {

        const {Id} = req.params
        const article = await getArticleHandle(Number(Id))

        return res.render("pages/article", {layout:layout, article:article})
    } catch (error) {

        console.log("Error:", error.message)

    }
}



export {
    getBlogs, 
    createArticle,
    articlePage
}