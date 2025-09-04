import { Request, Response } from "express";
import { getListProductHanle, getProductHandle, orderProductHandle } from "../services/productServiece";

const layout = "layouts/main"
const path = "pages/"

declare module "express-session" {
  interface SessionData {
    cart?: {
      productId: number;
      quantity: number;
    }[];
  }
}

const productsPage = async (req: Request, res: Response) => {
    const products = await getListProductHanle()
    return res.render(path + "shop", { layout: layout, products:products})
}

const productPage = async (req: Request, res: Response) => {
    const {Id} = req.params
    const product = await getProductHandle(Number(Id))
    return res.render(path + "product", { layout: layout, product:product})
}

const addProductToCart = async (req: Request, res: Response) =>{
  const { productId, quantity } = req.body;


  if (!req.session.cart) {
    req.session.cart = [];
  }

  // ép kiểu sang số nguyên
  const parsedProductId = parseInt(productId, 10);
  const parsedQuantity = parseInt(quantity, 10);

  if (isNaN(parsedProductId) || isNaN(parsedQuantity)) {
    return res.status(400).json({ error: "productId và quantity phải là số" });
  }

  // Tìm sản phẩm đã tồn tại trong giỏ
  const existingItem = req.session.cart.find(
    (item) => item.productId === parsedProductId
  );

  if (existingItem) {
    existingItem.quantity += parsedQuantity; // cộng dồn số lượng
  } else {
    req.session.cart.push({ productId: parsedProductId, quantity: parsedQuantity });
  }

  return res.redirect(`product/${productId}`);
}

const cartPage = async (req: Request, res: Response) => {
  try {
    const productsInCart = req.session.cart || [];

    // Lấy chi tiết sản phẩm từ DB
    const detailedCart = await Promise.all(
      productsInCart.map(async (item) => {
        const product = await getProductHandle(item.productId); // lấy product từ DB
        if (!product) return null; // nếu product ko tồn tại (bị xóa)
        return {
          ...product,           // name, price, description, image...
          quantity: item.quantity,
          totalPrice: product.price * item.quantity, // tính tổng tiền cho sản phẩm
        };
      })
    );

    // lọc ra những product null (bị xóa hoặc không tồn tại)
    const validCart = detailedCart.filter((p) => p !== null);


    return res.render("pages/cart", { 
      layout: "layouts/main", 
      cart: validCart 
    });

  } catch (err) {
    console.error("Lỗi khi load giỏ hàng:", err);
    res.status(500).json({ error: "Không thể tải giỏ hàng" });
  }
};

const removeProductInCart = (req: Request, res: Response)=>{
    const { Id } = req.params;
    req.session.cart = (req.session.cart || []).filter(
    (item) => item.productId !== Number(Id)
    );
  return res.redirect("/cart")
}

const order = async (req: Request, res: Response) =>{
  try {
      const { cart, user } = req.session;
      const userId = user?.id;
      const status = "open"
      const {address} = req.body

      if (!userId) {
        return res.status(401).json({ error: "Bạn chưa đăng nhập" });
      }

      const orderId = await orderProductHandle(userId, address ,status ,cart || []);

      // Xóa giỏ hàng sau khi đặt
      req.session.cart = [];

      return res.json({
        message: "Đặt hàng thành công",
        orderId,
      });
    } catch (err: any) {
      console.error("Lỗi khi đặt hàng:", err);
      return res.status(400).json({ error: err.message });
    }
  
}



export {
    productsPage, 
    productPage,
    addProductToCart,
    cartPage,
    removeProductInCart,
    order,
}

