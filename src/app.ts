import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";

import accountRouter from "./routes/account";
import shopRouter from "./routes/shop";
import homeRouter from "./routes/home";
import blogRouter from "./routes/blog";
import aboutRouter from "./routes/about";
import adminRouter from "./routes/admin";
import { setUserLocals } from "./middlewares/auth";

import path from "path"
import { delayMiddleware } from "./middlewares/delay";
import { config } from "./config";

const app = express();
const port = 3000;

app.use(express.json());

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60,
      sameSite: "lax",
    },
  })
);

// áp dụng cho tất cả route
app.use(setUserLocals);
app.use(delayMiddleware(100))

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
// app.set("layout", "layouts/main"); 

app.use(
  accountRouter,
  shopRouter,
  homeRouter,
  blogRouter, 
  aboutRouter,
  adminRouter
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});