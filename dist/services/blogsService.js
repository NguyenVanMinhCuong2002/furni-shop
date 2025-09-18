"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListArticleHanle = exports.getArticleHandle = exports.updateArticleHandle = exports.deleteArticleHandle = exports.createArticleHandle = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const createArticleHandle = async (title, content, author_id) => {
    try {
        const query = `INSERT INTO articles(title, content, user_id) VALUES('${title}', '${content}', ${author_id} ) RETURNING *`;
        const article = await connection_1.default.one(query);
        return !!article;
    }
    catch (error) {
        console.log("Error:", error.message);
        return "Error" + error;
    }
};
exports.createArticleHandle = createArticleHandle;
const deleteArticleHandle = async (Id) => {
    try {
        const query = `DELETE FROM articles WHERE id = ${Id}`;
        const result = await connection_1.default.result(query);
        if (result.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.deleteArticleHandle = deleteArticleHandle;
const updateArticleHandle = async (Id, title, content, author_id) => {
    try {
        const query = `
      UPDATE articles
      SET title = '${title}', content = '${content}', author_id = '${author_id}'
      WHERE id = '${Id}'
      RETURNING *;
    `;
        const updatedArticle = await connection_1.default.oneOrNone(query);
        return updatedArticle; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.updateArticleHandle = updateArticleHandle;
const getArticleHandle = async (id) => {
    try {
        const query = `SELECT * FROM articles WHERE id = '${id}'`;
        const article = await connection_1.default.oneOrNone(query);
        return article;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getArticleHandle = getArticleHandle;
const getListArticleHanle = async () => {
    try {
        const query = `SELECT * FROM articles`;
        const articles = await connection_1.default.manyOrNone(query);
        return articles;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getListArticleHanle = getListArticleHanle;
