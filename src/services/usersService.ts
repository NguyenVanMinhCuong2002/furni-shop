import db from "../database/connection";
import { hashSync, compare } from "bcrypt-ts";

const salt = 8


const checkEmail = async (email:string) =>{
  try {

    const query = `SELECT * FROM users WHERE email = $1`
    const user = await db.oneOrNone(query,[email]);

    return !!user;

  } catch (err: any) {

    console.error("Lỗi khi kiểm tra email:", err);

  }
}



const createUserHandle = async (name: string, email: string, phone: string, username: string, password: string, role: string) =>{
    try {

        const email_status = await checkEmail(email)
        const hashed_password = await hashSync(password, salt)
        if(email_status != true){
            const query = `INSERT INTO users(name, email, phone, username, password, role) VALUES($1, $2, $3, $4, $5, $6 ) RETURNING *`;
            const user = await db.one(query,[name, email, phone, username, hashed_password, role]);

            return !!user;

        }else{

            return "Email hoặc Username đã tồn tại trong hệ thống."

        }
    } catch (error: any) {

        return error

    }
}



const getUserHandle = async (id: number) =>{
    try {

        // console.log(id)
        const query = `SELECT * FROM users WHERE id = $1`;
        const user = await db.oneOrNone(query, [id]);

        return user;

    }catch (error: any) {

        console.log("Error:", error.message);

    }

}



const updateUserHandle = async (id: number, name:string, email:string, phone:string, username:string, password:string, role:string) => {
  try {
    const hashed_password = await hashSync(password, salt)
    const query = `
      UPDATE users
      SET name = $1, email = $2, password = $3, phone = $4, username = $5, role = $6
      WHERE id = $7
      RETURNING *;
    `;
    const updatedUser = await db.oneOrNone(query, [name, email, hashed_password, phone, username, role, id]);

    return updatedUser; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy

  } catch (error: any) {

    console.log("Error:", error.message);

  }
};



const getListUserHanle = async() =>{
    try {

        const query = `SELECT * FROM users`;
        const users = await db.manyOrNone(query);

        return users;

    } catch (error: any) {

        console.log("Error:", error.message);

    }
}



const deleteUserHandle = async (id: number) =>{
    try {

      const query = `DELETE FROM users WHERE id = $1`
      const result = await db.result(query, [id]);

      if (result.rowCount > 0) {

          return true
      } else {

          return false
      }

    } catch (error: any) {

        console.log("Error:", error.message)

    }
}



const loginHandle = async (email:string, password:string) =>{
  try {

    const query = `SELECT * FROM users WHERE email = $1`
    const user = await db.oneOrNone(query, [email])


    const compare_result = await compare(password, user.password)
    if(compare_result){

      return user

    }

    return false

  } catch (error: any) {

    console.log("Error:", error.message)
    return false

  }
}


export {
    createUserHandle, 
    getUserHandle, 
    getListUserHanle, 
    updateUserHandle,
    deleteUserHandle,
    loginHandle
}