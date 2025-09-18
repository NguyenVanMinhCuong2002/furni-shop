"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
const express_session_1 = __importDefault(require("express-session"));
const account_1 = __importDefault(require("./routes/account"));
const shop_1 = __importDefault(require("./routes/shop"));
const home_1 = __importDefault(require("./routes/home"));
const blog_1 = __importDefault(require("./routes/blog"));
const about_1 = __importDefault(require("./routes/about"));
const admin_1 = __importDefault(require("./routes/admin"));
const auth_1 = require("./middlewares/auth");
const path_1 = __importDefault(require("path"));
const delay_1 = require("./middlewares/delay");
const config_1 = require("./config");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: config_1.config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60,
        sameSite: "lax",
    },
}));
// áp dụng cho tất cả route
app.use(auth_1.setUserLocals);
app.use((0, delay_1.delayMiddleware)(100));
app.set("view engine", "ejs");
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_ejs_layouts_1.default);
// app.set("layout", "layouts/main"); 
app.use(account_1.default, shop_1.default, home_1.default, blog_1.default, about_1.default, admin_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
