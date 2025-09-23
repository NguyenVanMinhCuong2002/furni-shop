import db from "../database/connection";


const createArticleHandle = async (title:string, content:string, author_id:number)=> {

      try {
        
        const query = `INSERT INTO articles(title, content, user_id) VALUES($1, $2, $3 ) RETURNING *`;
        const article = await db.one(query, [title, content, author_id]);

        return !!article;


    } catch (error: any) {

        console.log("Error:", error.message)

        return "Error" + error

    }

}



const deleteArticleHandle = async (Id:string) => {
      try {

      const query = `DELETE FROM articles WHERE id = $1`
      const result = await db.result(query, [Id]);

      if (result.rowCount > 0) {

          return true
      } else {

          return false
      }

    } catch (error: any) {

        console.log("Error:", error.message)

    }
}



const updateArticleHandle = async (Id: number, title:string, content:string, author_id:number) => {
  try {

    const query = `
      UPDATE articles
      SET title = $1, content = $2, author_id = $3
      WHERE id = $4
      RETURNING *;
    `;
    const updatedArticle = await db.oneOrNone(query, [content, author_id, Id]);

    return updatedArticle; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy

  } catch (error: any) {

    console.log("Error:", error.message);

  }
}



const getArticleHandle = async (id: number) =>{
    try {

        const query = `SELECT * FROM articles WHERE id = $1`;
        const article = await db.oneOrNone(query, [id]);

        return article;

    }catch (error: any) {

        console.log("Error:", error.message);

    }

}



const getListArticleHanle = async() =>{
    try {

        const query = `SELECT * FROM articles`;
        const articles = await db.manyOrNone(query);

        return articles;

    } catch (error: any) {

        console.log("Error:", error.message);

    }
}



export {
    createArticleHandle,
    deleteArticleHandle,
    updateArticleHandle,
    getArticleHandle,
    getListArticleHanle

}