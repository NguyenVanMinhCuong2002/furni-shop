import db from "../database/connection"



const createCommentProductHandle = async (user_Id: Number, content:String, product_Id: Number) =>{
    try {

        const query = `INSERT INTO product_comments(user_id, content, product_id) VALUES($1, $2, $3 ) RETURNING *`;
        const article = await db.one(query, [user_Id, content, product_Id]);

        return !!article;

    } catch (error: any) {
        console.log("Error:", error.message)
    }



}



const getListCommentByIdProductHandle = async (product_Id:Number) =>{
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

        const comments = await db.manyOrNone(query, [product_Id]);
        console.log(comments)

        return comments;

    }catch (error: any) {

        console.log("Error:", error.message);

    }
} 




export {
    createCommentProductHandle,
    getListCommentByIdProductHandle
}