"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayMiddleware = delayMiddleware;
function delayMiddleware(ms) {
    return function (req, res, next) {
        setTimeout(() => {
            next();
        }, ms);
    };
}
