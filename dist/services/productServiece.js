"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOrderStatusHandle = exports.getProductByOrderIdHandle = exports.getListOrdersHandle = exports.orderProductHandle = exports.deleteProductHandle = exports.getProductHandle = exports.updateProductHandle = exports.createProductHandle = exports.getListProductHanle = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const getListProductHanle = async () => {
    try {
        const query = `SELECT * FROM products`;
        const users = await connection_1.default.manyOrNone(query);
        return users;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getListProductHanle = getListProductHanle;
const createProductHandle = async (name, description, price, created_by, img_link) => {
    try {
        const query = `INSERT INTO products(name, description, price, created_by, img_link) VALUES('${name}', '${description}', '${price}', '${created_by}', '${img_link}' ) RETURNING *`;
        const product = await connection_1.default.one(query);
        return !!product;
    }
    catch (error) {
        return error.message;
    }
};
exports.createProductHandle = createProductHandle;
const updateProductHandle = async (id, name, description, price, created_by, img_link) => {
    try {
        const query = `
        UPDATE products
        SET name = '${name}', description = '${description}', price = '${price}', created_by = '${created_by}', img_link = '${img_link}' 
        WHERE id = '${id}'
        RETURNING *;
        `;
        const updatedUser = await connection_1.default.oneOrNone(query);
        return updatedUser; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy
    }
    catch (error) {
        return error.message;
    }
};
exports.updateProductHandle = updateProductHandle;
const getProductHandle = async (id) => {
    try {
        // console.log(id)
        const query = `SELECT * FROM products WHERE id = '${id}'`;
        const product = await connection_1.default.oneOrNone(query);
        return product;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getProductHandle = getProductHandle;
const deleteProductHandle = async (id) => {
    try {
        const query = `DELETE FROM products WHERE id = ${id}`;
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
exports.deleteProductHandle = deleteProductHandle;
const orderProductHandle = async (userId, address, status, cart) => {
    if (!cart || cart.length === 0) {
        throw new Error("Giỏ hàng trống");
    }
    // 1. Tạo đơn hàng
    const order = await connection_1.default.one("INSERT INTO orders(user_id, status, address) VALUES($1, $2, $3) RETURNING id", [userId, status, address]);
    // 2. Lưu chi tiết đơn hàng
    for (const item of cart) {
        await connection_1.default.none("INSERT INTO order_details(order_id, product_id, quantity) VALUES($1, $2, $3)", [order.id, item.productId, item.quantity]);
    }
    return order.id;
};
exports.orderProductHandle = orderProductHandle;
const getProductByOrderIdHandle = async (orderId) => {
    const query = `SELECT p.*, od.quantity
     FROM products p
     JOIN order_details od ON p.id = od.product_id
     WHERE od.order_id = ${orderId}`;
    const products = await connection_1.default.any(query);
    return products;
};
exports.getProductByOrderIdHandle = getProductByOrderIdHandle;
const getListOrdersHandle = async () => {
    try {
        const query = `
        SELECT 
        o.id, 
        o.user_id, 
        o.status, 
        o.address, 
        u.username, 
        u.phone
        FROM orders o
        JOIN users u ON o.user_id = u.id
        ORDER BY o.id DESC
  `;
        const orders = await connection_1.default.manyOrNone(query);
        return orders;
    }
    catch (error) {
        console.log("error ", error);
        return error;
    }
};
exports.getListOrdersHandle = getListOrdersHandle;
const setOrderStatusHandle = async (orderId, newStatus) => {
    const query = `UPDATE orders
                        SET status = '${newStatus}'
                        WHERE id = ${orderId}
                        RETURNING *`;
    const order = await connection_1.default.oneOrNone(query);
    return order;
};
exports.setOrderStatusHandle = setOrderStatusHandle;
