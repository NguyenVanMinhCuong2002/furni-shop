"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandle = exports.deleteUserHandle = exports.updateUserHandle = exports.getListUserHanle = exports.getUserHandle = exports.createUserHandle = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const checkEmail = async (email) => {
    try {
        const user = await connection_1.default.oneOrNone(`SELECT * FROM users WHERE email = '${email}'`);
        return !!user;
    }
    catch (err) {
        console.error("Lỗi khi kiểm tra email:", err);
    }
};
const createUserHandle = async (name, email, phone, username, password, role) => {
    try {
        const email_status = await checkEmail(email);
        if (email_status != true) {
            const query = `INSERT INTO users(name, email, phone, username, password, role) VALUES('${name}', '${email}', '${phone}', '${username}', '${password}', '${role}' ) RETURNING *`;
            const user = await connection_1.default.one(query);
            return !!user;
        }
        else {
            return "Email hoặc Username đã tồn tại trong hệ thống.";
        }
    }
    catch (error) {
        return "Email hoặc Username đã tồn tại trong hệ thống.";
    }
};
exports.createUserHandle = createUserHandle;
const getUserHandle = async (id) => {
    try {
        // console.log(id)
        const query = `SELECT * FROM users WHERE id = '${id}'`;
        const user = await connection_1.default.oneOrNone(query);
        return user;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getUserHandle = getUserHandle;
const updateUserHandle = async (id, name, email, phone, username, password, role) => {
    try {
        const query = `
      UPDATE users
      SET name = '${name}', email = '${email}', password = '${password}', phone = '${phone}', username = '${username}' ,role = '${role}'
      WHERE id = '${id}'
      RETURNING *;
    `;
        const updatedUser = await connection_1.default.oneOrNone(query);
        return updatedUser; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.updateUserHandle = updateUserHandle;
const getListUserHanle = async () => {
    try {
        const query = `SELECT * FROM users`;
        const users = await connection_1.default.manyOrNone(query);
        return users;
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.getListUserHanle = getListUserHanle;
const deleteUserHandle = async (id) => {
    try {
        const query = `DELETE FROM users WHERE id = ${id}`;
        const result = await connection_1.default.result(query);
        if (result.rowCount > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log("Error:", error.message);
    }
};
exports.deleteUserHandle = deleteUserHandle;
const loginHandle = async (email, password) => {
    try {
        const query = `SELECT * FROM users WHERE email = '${email}'`;
        const user = await connection_1.default.oneOrNone(query);
        if (user.password == password) {
            return user;
        }
        return false;
    }
    catch (error) {
        console.log("Error:", error.message);
        return false;
    }
};
exports.loginHandle = loginHandle;
