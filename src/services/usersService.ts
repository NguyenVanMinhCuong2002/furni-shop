import db from "../database/connection";


const checkEmail = async (email:string) =>{
  try {

    const user = await db.oneOrNone(`SELECT * FROM users WHERE email = '${email}'`);

    return !!user;

  } catch (err: any) {

    console.error("Lỗi khi kiểm tra email:", err);

  }
}


const createUserHandle = async (name: string, email: string, phone: string, username: string, password: string, role: string) =>{
    try {

        const email_status = await checkEmail(email)
        if(email_status != true){
            const query = `INSERT INTO users(name, email, phone, username, password, role) VALUES('${name}', '${email}', '${phone}', '${username}', '${password}', '${role}' ) RETURNING *`;
            const user = await db.one(query);

            return !!user;

        }else{

            return "Email hoặc Username đã tồn tại trong hệ thống."

        }
    } catch (error: any) {

        return "Email hoặc Username đã tồn tại trong hệ thống."

    }
}

const getUserHandle = async (id: number) =>{
    try {

        // console.log(id)
        const query = `SELECT * FROM users WHERE id = '${id}'`;
        const user = await db.oneOrNone(query);

        return user;

    }catch (error: any) {

        console.log("Error:", error.message);

    }

}

const updateUserHandle = async (id: number, name:string, email:string, phone:string, username:string, password:string, role:string) => {
  try {

    const query = `
      UPDATE users
      SET name = '${name}', email = '${email}', password = '${password}', phone = '${phone}', username = '${username}' ,role = '${role}'
      WHERE id = '${id}'
      RETURNING *;
    `;
    const updatedUser = await db.oneOrNone(query);

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

      const query = `DELETE FROM users WHERE id = ${id}`
      const result = await db.result(query);

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

    const query = `SELECT * FROM users WHERE email = '${email}'`
    const user = await db.oneOrNone(query)
    
    if(user.password == password){

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