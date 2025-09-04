import { Router, Request, Response } from "express";
import { productsPage, productPage, cartPage, addProductToCart, removeProductInCart, order } from "../controllers/productsControllers";

const shopRouter = Router();

shopRouter.get("/shop",productsPage);
shopRouter.get("/product/:Id", productPage)
shopRouter.get("/cart/", cartPage)
shopRouter.get("/removeProductInCart/:Id", removeProductInCart)

shopRouter.post("/addCart", addProductToCart)
shopRouter.post("/order", order)



export default shopRouter;