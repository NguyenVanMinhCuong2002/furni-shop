import db from "../database/connection";

const getListProductHanle = async() =>{
    try {

        const query = `SELECT * FROM products`
        const users = await db.manyOrNone(query)

        return users;

    } catch (error: any) {

        console.log("Error:", error.message)

    }
}



const createProductHandle = async(name:string, description:string, price:number, created_by:number, img_link:string) =>{

    try {
        const query = `INSERT INTO products(name, description, price, created_by, img_link) VALUES($1, $2, $3, $4, $5 ) RETURNING *`;
        const product = await db.one(query,[name, description, price, created_by, img_link]);

        return !!product;

    } catch (error: any) {
        return error.message
    }

}



const updateProductHandle = async (id:number, name:string, description:string, price:number, created_by:number, img_link:string) => {
    try {
        
        const query = `
        UPDATE products
        SET name = $1, description = $2, price = $3, created_by = $4, img_link = $5 
        WHERE id = $6
        RETURNING *;
        `;
        const updatedUser = await db.oneOrNone(query, [name, description, price, created_by, img_link, id]);

    return updatedUser; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy

    } catch (error: any) {
        return error.message
    }
}



const getProductHandle = async (id:number) =>{
    try {

        // console.log(id)
        const query = `SELECT * FROM products WHERE id = $1`;
        const product = await db.oneOrNone(query,[id]);

        return product;

    }catch (error: any) {

        console.log("Error:", error.message);

    }
}



const deleteProductHandle = async (id:number) =>{
    try{
      const query = `DELETE FROM products WHERE id = $1`
      const result = await db.result(query, [id]);

      if (result.rowCount > 0) {

          return true
      } else {

          return false
      }

    } catch (error: any) {

        console.log("Error:", error.message);

    }
}



const orderProductHandle = async(userId: number, address:string ,status:string, cart: { productId: number, quantity: number }[]) =>{
    if (!cart || cart.length === 0) {
        throw new Error("Giỏ hàng trống");
    }

    // 1. Tạo đơn hàng
    const order = await db.one(
        "INSERT INTO orders(user_id, status, address) VALUES($1, $2, $3) RETURNING id",
        [userId, status, address]
    );

    // 2. Lưu chi tiết đơn hàng
    for (const item of cart) {
        await db.none(
        "INSERT INTO order_details(order_id, product_id, quantity) VALUES($1, $2, $3)",
        [order.id, item.productId, item.quantity]
        )
    }

    return order.id;
}



const getProductByOrderIdHandle = async(orderId: Number) =>{

    const query = `SELECT p.*, od.quantity
     FROM products p
     JOIN order_details od ON p.id = od.product_id
     WHERE od.order_id = $1`

    const products = await db.any(query, orderId)

    return products
}



const getListOrdersHandle = async () =>{
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
  `
        
        const orders = await db.manyOrNone(query)
  
        return orders;
    } catch (error:any) {

        console.log("error ",error)

        return error
    }
}

const setOrderStatusHandle = async (orderId: number, newStatus: string) => {
    const query =    `UPDATE orders
                        SET status = $1
                        WHERE id = $2
                        RETURNING *`

    const order = await db.oneOrNone(query, [newStatus, orderId])
                        
    return order
}

export {
    getListProductHanle,
    createProductHandle,
    updateProductHandle,
    getProductHandle,
    deleteProductHandle,
    orderProductHandle,
    getListOrdersHandle,
    getProductByOrderIdHandle,
    setOrderStatusHandle
}