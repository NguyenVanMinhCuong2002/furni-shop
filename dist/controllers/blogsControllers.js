"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlePage = exports.createArticle = exports.getBlogs = void 0;
const blogsService_1 = require("../services/blogsService");
const pages = "pages/blog";
const layout = "layouts/main";
const getBlogs = async (req, res) => {
    const articles = await (0, blogsService_1.getListArticleHanle)();
    return res.render(pages, { layout: layout, articles: articles });
};
exports.getBlogs = getBlogs;
const createArticle = (req, res) => {
    try {
        const { title, content, author_id } = req.body;
        const article = (0, blogsService_1.createArticleHandle)(title, content, author_id);
        return res.redirect("articles");
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.createArticle = createArticle;
const articlePage = async (req, res) => {
    try {
        const { Id } = req.params;
        const article = await (0, blogsService_1.getArticleHandle)(Number(Id));
        return res.render("pages/article", { layout: layout, article: article });
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.articlePage = articlePage;
