import { Request, Response } from "express";
import { createUserHandle, getUserHandle, loginHandle, updateUserHandle } from "../services/usersService";


// mở rộng SessionData
declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      username: string;
      role: string;
    };
  }
}


const registerForm = (req: Request, res: Response) => {
    return res.render("pages/register", { layout: "layouts/main"})
}

const loginForm = (req: Request, res: Response) => {
    return res.render("pages/login", { layout: "layouts/main"})
}

const profileUser = async (req: Request, res: Response) => {
    const {id} = req.params
    const user = await getUserHandle(Number(id))
    return res.render("pages/profile_user", { layout: "layouts/main", user:user})
}

const register = async (req: Request, res: Response) => {
    try{

        const role = "user";
        const {name, email, phone, username, password} = req.body
        const status = await createUserHandle(name, email, phone, username, password, role)

        if(status == true){

            return res.redirect("login")

        }

        return res.render("pages/register", { layout: "layouts/main", error:status})
    }
    catch (error:any){

      return res.status(500).send("Lỗi server")

    }
}


const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await loginHandle(email, password);

    if (!user) {
        
      return res.render("pages/login", {layout: "layouts/main", error:"Email hoặc mật khẩu không đúng"})
    }
    else{
            // Lưu thông tin user vào session
        req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        };

        // Cookie session sẽ tự động được gửi về client
        return res.redirect("shop")
    }


  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req: Request, res: Response) =>{
  req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Không thể logout" });
      }

      // xóa cookie session trên client
      res.clearCookie("connect.sid"); // tên cookie mặc định của express-session
      res.redirect("home")
  })
}

const updateUser = async (req: Request, res: Response) =>{
    try {

         const {Id, name, email, phone, username, password} = req.body;
         const role = "user"
         const status = await updateUserHandle(Id, name, email, phone, username, password, role);

         return res.redirect("home")

    } catch (error) {

         return res.status(500).send("Lỗi server");
    }
}

const forgotPassword = async (req: Request, res: Response)=>{

}



export {
    register, 
    registerForm, 
    loginForm,
    login,
    profileUser,
    logout,
    updateUser,
    forgotPassword
}