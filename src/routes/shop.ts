import { Router, Request, Response } from "express";
import { productsPage, productPage, cartPage, addProductToCart, removeProductInCart, order, createCommentProduct, successOrder } from "../controllers/productsControllers";

const shopRouter = Router();

shopRouter.get("/shop",productsPage);
shopRouter.get("/product/:Id", productPage)
shopRouter.get("/cart/", cartPage)
shopRouter.get("/removeProductInCart/:Id", removeProductInCart)
shopRouter.get("/order_success", successOrder)

shopRouter.post("/addCart", addProductToCart)
shopRouter.post("/order", order)
shopRouter.post("/create_comment_product", createCommentProduct)


export default shopRouter;