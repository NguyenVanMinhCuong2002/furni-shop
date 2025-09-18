"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDeleteArticle = exports.adminArticlesPage = exports.adminCreateArticle = exports.adminSetStatus = exports.adminOrderDetail = exports.adminOrderPage = exports.adminDeleteProduct = exports.adminGetProductId = exports.adminProductUpdateForm = exports.adminUpdateProduct = exports.adminCreateProduct = exports.adminUpdateUser = exports.adminUpdateForm = exports.adminGetUserId = exports.adminCreateUser = exports.adminDeleteUser = exports.adminUsersPage = exports.adminLogin = exports.adminLoginForm = exports.adminProductPage = exports.adminBlogPage = exports.adminPage = void 0;
const usersService_1 = require("../services/usersService");
const productServiece_1 = require("../services/productServiece");
const blogsService_1 = require("../services/blogsService");
const layout = "layouts/admin";
const layoutLogin = "layouts/main";
const path = "admin/";
// Admin pages
const adminPage = (req, res) => {
    return res.render(path + "dashboard", { layout: layout });
};
exports.adminPage = adminPage;
const adminBlogPage = (req, res) => {
    return res.render(path + "articles", { layout: layout });
};
exports.adminBlogPage = adminBlogPage;
const adminLoginForm = (req, res) => {
    return res.render(path + "login", { layout: layoutLogin });
};
exports.adminLoginForm = adminLoginForm;
const adminLogin = (req, res) => {
};
exports.adminLogin = adminLogin;
// User  Controllers
const adminUsersPage = async (req, res) => {
    let users = await (0, usersService_1.getListUserHanle)();
    return res.render(path + "users", { layout: layout, users: users });
};
exports.adminUsersPage = adminUsersPage;
const adminGetUserId = async (req, res) => {
    let { Id } = req.params;
    let users = await (0, usersService_1.getUserHandle)(Number(Id));
    return users;
};
exports.adminGetUserId = adminGetUserId;
const adminUpdateForm = async (req, res) => {
    let { Id } = req.params;
    let user = await (0, usersService_1.getUserHandle)(Number(Id));
    return res.render(path + "admin_update_user_form", { layout: layout, user: user });
};
exports.adminUpdateForm = adminUpdateForm;
const adminDeleteUser = async (req, res) => {
    let { userId } = req.body;
    await (0, usersService_1.deleteUserHandle)(userId);
    return res.redirect("users");
};
exports.adminDeleteUser = adminDeleteUser;
const adminCreateUser = async (req, res) => {
    try {
        const { name, email, phone, username, password, role } = req.body;
        const status = await (0, usersService_1.createUserHandle)(name, email, phone, username, password, role);
        return res.redirect("users");
    }
    catch (error) {
        return res.status(500).send("Lỗi server");
    }
};
exports.adminCreateUser = adminCreateUser;
const adminUpdateUser = async (req, res) => {
    try {
        const { Id, name, email, phone, username, password, role } = req.body;
        const status = await (0, usersService_1.updateUserHandle)(Id, name, email, phone, username, password, role);
        return res.redirect("users");
    }
    catch (error) {
        return res.status(500).send("Lỗi server");
    }
};
exports.adminUpdateUser = adminUpdateUser;
// Product Controllers
const adminProductPage = async (req, res) => {
    const products = await (0, productServiece_1.getListProductHanle)();
    return res.render(path + "products", { layout: layout, products: products });
};
exports.adminProductPage = adminProductPage;
const adminCreateProduct = async (req, res) => {
    try {
        const userSession = req.session.user;
        const { name, price, description } = req.body;
        const filename = req.file?.filename;
        const create_by = Number(userSession?.id);
        const product = await (0, productServiece_1.createProductHandle)(name, description, price, create_by, String(filename));
        return res.redirect("products");
    }
    catch (error) {
        return error.message;
    }
};
exports.adminCreateProduct = adminCreateProduct;
const adminProductUpdateForm = async (req, res) => {
    try {
        let { Id } = req.params;
        let product = await (0, productServiece_1.getProductHandle)(Number(Id));
        return res.render(path + "admin_update_product_form", { layout: layout, product: product });
    }
    catch (error) {
    }
};
exports.adminProductUpdateForm = adminProductUpdateForm;
const adminUpdateProduct = async (req, res) => {
    try {
        const userSession = req.session.user;
        const { Id, name, price, description } = req.body;
        const filename = req.file?.filename;
        const create_by = Number(userSession?.id);
        const product = await (0, productServiece_1.updateProductHandle)(Id, name, description, price, create_by, String(filename));
        return res.redirect("products");
    }
    catch (error) {
        return error.message;
    }
};
exports.adminUpdateProduct = adminUpdateProduct;
const adminGetProductId = async (req, res) => {
    let { Id } = req.params;
    let users = await (0, productServiece_1.getProductHandle)(Number(Id));
    return users;
};
exports.adminGetProductId = adminGetProductId;
const adminDeleteProduct = async (req, res) => {
    let { userId } = req.body;
    await (0, productServiece_1.deleteProductHandle)(userId);
    return res.redirect("products");
};
exports.adminDeleteProduct = adminDeleteProduct;
// Order Controller
const adminOrderPage = async (req, res) => {
    const listOrders = await (0, productServiece_1.getListOrdersHandle)();
    return res.render(path + "order", { layout: layout, orders: listOrders });
};
exports.adminOrderPage = adminOrderPage;
const adminOrderDetail = async (req, res) => {
    const { Id } = req.params;
    const products = await (0, productServiece_1.getProductByOrderIdHandle)(Number(Id));
    return res.render(path + "order_details", { layout: layout, products: products });
};
exports.adminOrderDetail = adminOrderDetail;
const adminSetStatus = async (req, res) => {
    try {
        let { Id, status } = req.body;
        if (status == "open") {
            status = "shipping";
        }
        else {
            status = "closed";
        }
        await (0, productServiece_1.setOrderStatusHandle)(Id, status);
        return res.redirect(`orders`);
    }
    catch (error) {
        return res.status(500).send(error);
    }
};
exports.adminSetStatus = adminSetStatus;
// articles 
const adminCreateArticle = async (req, res) => {
    try {
        const userSession = req.session.user;
        const { title, content } = req.body;
        const author_id = Number(userSession?.id);
        await (0, blogsService_1.createArticleHandle)(title, content, author_id);
        return res.redirect("blogs");
    }
    catch (error) {
        return "Error:" + error.message;
    }
};
exports.adminCreateArticle = adminCreateArticle;
const adminDeleteArticle = async (req, res) => {
    try {
        const { Id } = req.body;
        await (0, blogsService_1.deleteArticleHandle)(Id);
        return res.redirect("blogs");
    }
    catch (error) {
        return "Error:" + error.message;
    }
};
exports.adminDeleteArticle = adminDeleteArticle;
const adminArticlesPage = async (req, res) => {
    const listArticles = await (0, blogsService_1.getListArticleHanle)();
    return res.render(path + "articles", { layout: layout, articles: listArticles });
};
exports.adminArticlesPage = adminArticlesPage;
