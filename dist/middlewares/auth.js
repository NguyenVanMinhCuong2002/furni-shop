"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.setUserLocals = setUserLocals;
exports.authorizeRoles = authorizeRoles;
function authMiddleware(req, res, next) {
    const userSession = req.session.user;
    if (!userSession) {
        return res.status(401).json({ error: "Chưa đăng nhập" });
    }
    req.userId = userSession.id;
    req.username = userSession.username;
    req.role = userSession.role;
    next();
}
// middleware check login
function setUserLocals(req, res, next) {
    res.locals.user = req.session.user || null;
    next();
}
function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!req.role) {
            return res.status(403).json({ error: "Không có quyền truy cập" });
        }
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ error: "Không có quyền truy cập" });
        }
        next();
    };
}
