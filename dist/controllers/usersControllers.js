"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.updateUser = exports.logout = exports.profileUser = exports.login = exports.loginForm = exports.registerForm = exports.register = void 0;
const usersService_1 = require("../services/usersService");
const registerForm = (req, res) => {
    return res.render("pages/register", { layout: "layouts/main" });
};
exports.registerForm = registerForm;
const loginForm = (req, res) => {
    return res.render("pages/login", { layout: "layouts/main" });
};
exports.loginForm = loginForm;
const profileUser = async (req, res) => {
    const { id } = req.params;
    const user = await (0, usersService_1.getUserHandle)(Number(id));
    return res.render("pages/profile_user", { layout: "layouts/main", user: user });
};
exports.profileUser = profileUser;
const register = async (req, res) => {
    try {
        const role = "user";
        const { name, email, phone, username, password } = req.body;
        const status = await (0, usersService_1.createUserHandle)(name, email, phone, username, password, role);
        if (status == true) {
            return res.redirect("login");
        }
        return res.render("pages/register", { layout: "layouts/main", error: status });
    }
    catch (error) {
        return res.status(500).send("Lỗi server");
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await (0, usersService_1.loginHandle)(email, password);
        if (!user) {
            return res.render("pages/login", { layout: "layouts/main", error: "Email hoặc mật khẩu không đúng" });
        }
        else {
            // Lưu thông tin user vào session
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role,
            };
            // Cookie session sẽ tự động được gửi về client
            return res.redirect("shop");
        }
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
};
exports.login = login;
const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Không thể logout" });
        }
        // xóa cookie session trên client
        res.clearCookie("connect.sid"); // tên cookie mặc định của express-session
        res.redirect("home");
    });
};
exports.logout = logout;
const updateUser = async (req, res) => {
    try {
        const { Id, name, email, phone, username, password } = req.body;
        const role = "user";
        const status = await (0, usersService_1.updateUserHandle)(Id, name, email, phone, username, password, role);
        return res.redirect("home");
    }
    catch (error) {
        return res.status(500).send("Lỗi server");
    }
};
exports.updateUser = updateUser;
const forgotPassword = async (req, res) => {
};
exports.forgotPassword = forgotPassword;
