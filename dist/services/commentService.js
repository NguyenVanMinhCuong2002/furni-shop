"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListCommentByIdProductHandle = exports.createCommentProductHandle = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const createCommentProductHandle = async (user_Id, content, product_Id) => {
    try {
        const query = `INSERT INTO product_comments(user_id, content, product_id) VALUES('${user_Id}', '${content}', ${product_Id} ) RETURNING *`;
        const article = await connection_1.default.one(query);
        return !!article;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.createCommentProductHandle = createCommentProductHandle;
const getListCommentByIdProductHandle = async (product_Id) => {
    try {
        const query = `
        SELECT 
            cp.id,
            cp.product_id,
            cp.content,
            u.name AS username
        FROM product_comments cp
        JOIN users u ON cp.user_id = u.id
        WHERE cp.product_id = $1
        `;
        const comments = await connection_1.default.manyOrNone(query, [product_Id]);
        console.log(comments);
        return comments;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getListCommentByIdProductHandle = getListCommentByIdProductHandle;
