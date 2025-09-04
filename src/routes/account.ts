import { Router } from "express";
import { registerForm, loginForm, login, profileUser, logout, updateUser } from "../controllers/usersControllers";
import { register } from "../controllers/usersControllers";

const accountRouter = Router();

accountRouter.get("/register", registerForm);
accountRouter.get("/login", loginForm);
accountRouter.get("/profile/:id", profileUser)

accountRouter.post("/register", register);
accountRouter.post("/login", login);
accountRouter.post("/logout", logout)
accountRouter.post("/update-user", updateUser)


export default accountRouter;