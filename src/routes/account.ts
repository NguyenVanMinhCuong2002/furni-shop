import { Router } from "express";
import { registerForm, loginForm, login, profileUser, logout, updateUser, forgotPassword } from "../controllers/usersControllers";
import { register } from "../controllers/usersControllers";
import { authMiddleware, authorizeRoles } from "../middlewares/auth";

const accountRouter = Router();

accountRouter.get("/register", registerForm);
accountRouter.get("/login", loginForm);
accountRouter.get("/profile",authMiddleware ,profileUser)
accountRouter.get("/forgot_passowrd", forgotPassword)

accountRouter.post("/register", register);
accountRouter.post("/login", login);
accountRouter.post("/logout", authMiddleware, logout)
accountRouter.post("/update-user", authMiddleware, updateUser)


export default accountRouter;