"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = require("../controllers/adminControllers");
const image_storage_1 = __importDefault(require("../middlewares/image_storage"));
const auth_1 = require("../middlewares/auth");
const adminRouter = (0, express_1.Router)();
const path = "/admin/";
// adminRouter.get(path + "login", adminLoginForm)
adminRouter.get(path + "users", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminUsersPage);
adminRouter.get(path + "dashboard", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminPage);
// user router
adminRouter.get(path + "user/:Id", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminGetUserId);
adminRouter.get(path + "user-update/:Id", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminUpdateForm);
adminRouter.post(path + "delete-user", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminDeleteUser);
adminRouter.post(path + "create-user", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminCreateUser);
adminRouter.post(path + "user-update", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminUpdateUser);
// product router
adminRouter.get(path + "products", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminProductPage);
adminRouter.get(path + "product-update/:Id", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminProductUpdateForm);
adminRouter.get(path + "product/:Id", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminGetProductId);
adminRouter.post(path + "delete-product", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminDeleteProduct);
adminRouter.post(path + "create-product", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), image_storage_1.default.single("image"), adminControllers_1.adminCreateProduct);
adminRouter.post(path + "product-update", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), image_storage_1.default.single("image"), adminControllers_1.adminUpdateProduct);
// adminRouter
// Order 
adminRouter.get(path + "orders", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminOrderPage);
adminRouter.get(path + "order_details/:Id", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminOrderDetail);
adminRouter.post(path + "set-order-status", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminSetStatus);
// blog router
adminRouter.get(path + "blogs", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminArticlesPage);
adminRouter.post(path + "create-article", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminCreateArticle);
adminRouter.post(path + "delete-article", auth_1.authMiddleware, (0, auth_1.authorizeRoles)("admin"), adminControllers_1.adminDeleteArticle);
exports.default = adminRouter;
