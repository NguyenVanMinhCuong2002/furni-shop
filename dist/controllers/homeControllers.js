"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutPage = exports.homePage = void 0;
const layout = "layouts/main";
const path = "pages/";
const homePage = (req, res) => {
    return res.render(path + "index", { layout: layout });
};
exports.homePage = homePage;
const aboutPage = (req, res) => {
    return res.render(path + "about", { layout: layout });
};
exports.aboutPage = aboutPage;
