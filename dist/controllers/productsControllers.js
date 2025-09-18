"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successOrder = exports.listCommentProduct = exports.createCommentProduct = exports.order = exports.removeProductInCart = exports.cartPage = exports.addProductToCart = exports.productPage = exports.productsPage = void 0;
const productServiece_1 = require("../services/productServiece");
const commentService_1 = require("../services/commentService");
const layout = "layouts/main";
const path = "pages/";
const productsPage = async (req, res) => {
    const products = await (0, productServiece_1.getListProductHanle)();
    return res.render(path + "shop", { layout: layout, products: products });
};
exports.productsPage = productsPage;
const productPage = async (req, res) => {
    const { Id } = req.params;
    const product = await (0, productServiece_1.getProductHandle)(Number(Id));
    const comments = await (0, commentService_1.getListCommentByIdProductHandle)(Number(Id));
    return res.render(path + "product", { layout: layout, product: product, comments: comments, user: req.session.user || null });
};
exports.productPage = productPage;
const addProductToCart = async (req, res) => {
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
    const existingItem = req.session.cart.find((item) => item.productId === parsedProductId);
    if (existingItem) {
        existingItem.quantity += parsedQuantity; // cộng dồn số lượng
    }
    else {
        req.session.cart.push({ productId: parsedProductId, quantity: parsedQuantity });
    }
    return res.redirect(`product/${productId}`);
};
exports.addProductToCart = addProductToCart;
const cartPage = async (req, res) => {
    try {
        const productsInCart = req.session.cart || [];
        // Lấy chi tiết sản phẩm từ DB
        const detailedCart = await Promise.all(productsInCart.map(async (item) => {
            const product = await (0, productServiece_1.getProductHandle)(item.productId); // lấy product từ DB
            if (!product)
                return null; // nếu product ko tồn tại (bị xóa)
            return {
                ...product, // name, price, description, image...
                quantity: item.quantity,
                totalPrice: product.price * item.quantity, // tính tổng tiền cho sản phẩm
            };
        }));
        // lọc ra những product null (bị xóa hoặc không tồn tại)
        const validCart = detailedCart.filter((p) => p !== null);
        return res.render("pages/cart", {
            layout: "layouts/main",
            cart: validCart
        });
    }
    catch (err) {
        console.error("Lỗi khi load giỏ hàng:", err);
        res.status(500).json({ error: "Không thể tải giỏ hàng" });
    }
};
exports.cartPage = cartPage;
const removeProductInCart = (req, res) => {
    const { Id } = req.params;
    req.session.cart = (req.session.cart || []).filter((item) => item.productId !== Number(Id));
    return res.redirect("/cart");
};
exports.removeProductInCart = removeProductInCart;
const order = async (req, res) => {
    try {
        const { cart, user } = req.session;
        const userId = user?.id;
        const status = "open";
        const { address } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Bạn chưa đăng nhập" });
        }
        const orderId = await (0, productServiece_1.orderProductHandle)(userId, address, status, cart || []);
        // Xóa giỏ hàng sau khi đặt
        req.session.cart = [];
        return res.json({
            message: "Đặt hàng thành công",
            orderId,
        });
    }
    catch (err) {
        console.error("Lỗi khi đặt hàng:", err);
        return res.status(400).json({ error: err.message });
    }
};
exports.order = order;
const createCommentProduct = async (req, res) => {
    try {
        const { content, product_id } = req.body;
        const userSession = req.session.user;
        const user_id = Number(userSession?.id);
        await (0, commentService_1.createCommentProductHandle)(user_id, content, product_id);
        return res.redirect(`/product/${product_id}`);
    }
    catch (error) {
        console.log("Message " + "Comment thất bại");
    }
};
exports.createCommentProduct = createCommentProduct;
const listCommentProduct = async (req, res) => {
    try {
        const { product_id } = req.params;
        const listComment = await (0, commentService_1.getListCommentByIdProductHandle)(Number(product_id));
        return listComment;
    }
    catch (error) {
        return { "Message": "Comment thất bại" };
    }
};
exports.listCommentProduct = listCommentProduct;
const successOrder = async (req, res) => {
    return res.render(path + "success", { layout: layout });
};
exports.successOrder = successOrder;
