import { Router } from "express";
import { adminBlogPage, adminOrderPage, adminProductPage, adminPage, adminUsersPage, adminDeleteUser, adminCreateUser, adminGetUserId, adminUpdateForm, adminUpdateUser, adminCreateProduct, adminUpdateProduct, adminProductUpdateForm, adminGetProductId, adminDeleteProduct, adminOrderDetail, adminSetStatus, adminArticlesPage, adminCreateArticle, adminDeleteArticle} from "../controllers/adminControllers";
import upload from "../middlewares/image_storage";
import { authMiddleware, authorizeRoles } from "../middlewares/auth";


const adminRouter = Router() 

const path = "/admin/"

// adminRouter.get(path + "login", adminLoginForm)
adminRouter.get(path + "users", authMiddleware, authorizeRoles("admin"), adminUsersPage)
adminRouter.get(path + "dashboard", authMiddleware, authorizeRoles("admin"), adminPage)

// user router
adminRouter.get(path + "user/:Id", authMiddleware, authorizeRoles("admin"), adminGetUserId)
adminRouter.get(path + "user-update/:Id", authMiddleware, authorizeRoles("admin"), adminUpdateForm)

adminRouter.post(path + "delete-user", authMiddleware, authorizeRoles("admin"), adminDeleteUser)
adminRouter.post(path + "create-user", authMiddleware, authorizeRoles("admin"), adminCreateUser)
adminRouter.post(path + "user-update", authMiddleware, authorizeRoles("admin"), adminUpdateUser)

// product router
adminRouter.get(path + "products", authMiddleware, authorizeRoles("admin"), adminProductPage)
adminRouter.get(path + "product-update/:Id", authMiddleware, authorizeRoles("admin"), adminProductUpdateForm)
adminRouter.get(path + "product/:Id", authMiddleware, authorizeRoles("admin"), adminGetProductId)

adminRouter.post(path + "delete-product", authMiddleware, authorizeRoles("admin"), adminDeleteProduct)
adminRouter.post(path + "create-product", authMiddleware, authorizeRoles("admin"), upload.single("image"), adminCreateProduct)
adminRouter.post(path + "product-update", authMiddleware, authorizeRoles("admin"), upload.single("image"), adminUpdateProduct)

// adminRouter

// Order 
adminRouter.get(path + "orders",authMiddleware, authorizeRoles("admin"), adminOrderPage)
adminRouter.get(path + "order_details/:Id", authMiddleware, authorizeRoles("admin"), adminOrderDetail)

adminRouter.post(path + "set-order-status", authMiddleware, authorizeRoles("admin"), adminSetStatus)


// blog router
adminRouter.get(path + "blogs", authMiddleware, authorizeRoles("admin"), adminArticlesPage)

adminRouter.post(path + "create-article", authMiddleware, authorizeRoles("admin"), adminCreateArticle)
adminRouter.post(path + "delete-article", authMiddleware, authorizeRoles("admin"), adminDeleteArticle)

export default adminRouter;