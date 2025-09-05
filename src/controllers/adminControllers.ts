import { Request, Response } from "express";
import { getListUserHanle, deleteUserHandle, createUserHandle, getUserHandle, updateUserHandle } from "../services/usersService";
import { createProductHandle, deleteProductHandle, getListOrdersHandle, getListProductHanle, getProductByOrderIdHandle, getProductHandle, setOrderStatusHandle, updateProductHandle } from "../services/productServiece";
import { order } from "./productsControllers";
import { createArticleHandle, deleteArticleHandle, getListArticleHanle } from "../services/blogsService";


const layout = "layouts/admin"
const layoutLogin = "layouts/main"
const path = "admin/"

// Admin pages
const adminPage = (req: Request, res: Response) => {
    
    return res.render(path + "dashboard", { layout: layout})
}

const adminBlogPage = (req: Request, res: Response) => {

    return res.render(path + "articles", { layout: layout})
}

const adminLoginForm = (req: Request, res: Response) => {

    return res.render(path + "login", { layout: layoutLogin})
}

const adminLogin = (req: Request, res: Response) => {

}

// User  Controllers
const adminUsersPage = async (req: Request, res: Response) => {
    
    let users = await getListUserHanle() 

    return res.render(path + "users", { layout: layout, users: users})
}

const adminGetUserId = async (req: Request, res: Response) => {
    
    let {Id} = req.params;
    let users = await getUserHandle(Number(Id)) 

    return users
}

const adminUpdateForm = async (req: Request, res: Response) => {

    let {Id} = req.params 
    let user = await getUserHandle(Number(Id)) 

    return res.render(path + "admin_update_user_form", { layout: layout, user: user})
}

const adminDeleteUser = async (req: Request, res: Response) =>{
    let {userId} = req.body
    await deleteUserHandle(userId)

    return res.redirect("users");
}

const adminCreateUser = async (req: Request, res: Response) => {
    try{

        const {name, email, phone, username, password, role} = req.body;
        const status = await createUserHandle(name, email, phone, username, password, role);
   
        return res.redirect("users")

    }
    catch (error:any){

      return res.status(500).send("Lỗi server");
    }
}

const adminUpdateUser = async (req: Request, res: Response) =>{
    try {

         const {Id, name, email, phone, username, password, role} = req.body;
         const status = await updateUserHandle(Id, name, email, phone, username, password, role);

         return res.redirect("users")

    } catch (error) {

         return res.status(500).send("Lỗi server");
    }
}


// Product Controllers
const adminProductPage = async (req: Request, res: Response) => {

    const products = await getListProductHanle()

    return res.render(path + "products", { layout: layout, products: products})
}


const adminCreateProduct = async (req: Request, res: Response) => {
    try {
        
        const userSession = req.session.user;
        const {name,  price, description} = req.body
        const filename = req.file?.filename;
        const create_by = Number(userSession?.id)
        const product = await createProductHandle(name, description, price, create_by, String(filename))
        
        return res.redirect("products")

    } catch (error: any) {
        
        return error.message
    }
}
const adminProductUpdateForm = async (req: Request, res: Response) =>{
    try {
        let {Id} = req.params 
        let product = await getProductHandle(Number(Id)) 

        return res.render(path + "admin_update_product_form", { layout: layout, product: product})
    } catch (error: any) {
        
    }
}

const adminUpdateProduct = async (req: Request, res: Response) =>{
    try{
        const userSession = req.session.user;
        const {Id, name,  price, description} = req.body
        const filename = req.file?.filename;
        const create_by = Number(userSession?.id)
        const product = await updateProductHandle(Id ,name, description, price, create_by, String(filename))
        
        return res.redirect("products")

    } catch (error: any) {
        
        return error.message
    }
}

const adminGetProductId = async (req: Request, res: Response) => {
    
    let {Id} = req.params;
    let users = await getProductHandle(Number(Id)) 

    return users
}

const adminDeleteProduct = async (req: Request, res: Response) =>{
    let {userId} = req.body
    await deleteProductHandle(userId)

    return res.redirect("products");
}


// Order Controller
const adminOrderPage = async (req: Request, res: Response) =>{
    
    const listOrders = await getListOrdersHandle()

    return res.render(path + "order", { layout: layout, orders:listOrders})
}

const adminOrderDetail = async (req: Request, res: Response) =>{

    const {Id} = req.params;
    const products = await getProductByOrderIdHandle(Number(Id))

    return res.render(path + "order_details", { layout: layout, products:products})
}

const adminSetStatus = async (req: Request, res: Response) =>{
  try {

         let {Id, status} = req.body

         if(status == "open"){
            status = "shipping"
         }else{
            status = "closed"
         }

         await setOrderStatusHandle(Id, status)

         return res.redirect(`orders`)

    } catch (error: any) {

         return res.status(500).send(error);
    }
}


// articles 
const adminCreateArticle = async (req: Request, res: Response) =>{

    try {
        const userSession = req.session.user;
        const {title, content } = req.body
        const author_id = Number(userSession?.id)
        await createArticleHandle(title, content, author_id)

        return res.redirect("blogs")
    } catch (error) {
        return "Error:" + error.message
    }

}

const adminDeleteArticle = async (req: Request, res: Response) =>{
    try {
        const {Id}= req.body
        await deleteArticleHandle(Id)

        return res.redirect("blogs")
    } catch (error) {
        return "Error:" + error.message
    }
}

const adminArticlesPage = async (req: Request, res: Response) => {
    const listArticles = await getListArticleHanle()

    return res.render(path + "articles", { layout: layout, articles:listArticles})
}

export {
    adminPage, 
    adminBlogPage, 
    adminProductPage, 
    adminLoginForm,
    adminLogin,
    adminUsersPage,
    adminDeleteUser,
    adminCreateUser,
    adminGetUserId,
    adminUpdateForm,
    adminUpdateUser,
    adminCreateProduct,
    adminUpdateProduct,
    adminProductUpdateForm,
    adminGetProductId,
    adminDeleteProduct,
    adminOrderPage,
    adminOrderDetail,
    adminSetStatus,
    adminCreateArticle,
    adminArticlesPage,
    adminDeleteArticle
}