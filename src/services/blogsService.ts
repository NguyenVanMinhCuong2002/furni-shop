import db from "../database/connection";


const createArticleHandle = async (title:string, content:string, author_id:number)=> {

      try {
        
        const query = `INSERT INTO article(title, content, created_by) VALUES('${title}', '${content}', ${author_id} ) RETURNING *`;
        const article = await db.one(query);

        return !!article;


    } catch (error: any) {

        console.log("Error:", error.message)

        return "Error" + error

    }

}

const deleteArticleHandle = async (Id:string) => {
      try {

      const query = `DELETE FROM article WHERE id = ${Id}`
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

const updateArticleHandle = async (Id: number, title:string, content:string, author_id:number) => {
  try {

    const query = `
      UPDATE article
      SET title = '${title}', content = '${content}', author_id = '${author_id}'
      WHERE id = '${Id}'
      RETURNING *;
    `;
    const updatedArticle = await db.oneOrNone(query);

    return updatedArticle; // sẽ trả về user sau khi update, hoặc null nếu không tìm thấy

  } catch (error: any) {

    console.log("Error:", error.message);

  }
}

const getArticleHandle = async (id: number) =>{
    try {

        const query = `SELECT * FROM article WHERE id = '${id}'`;
        const article = await db.oneOrNone(query);

        return article;

    }catch (error: any) {

        console.log("Error:", error.message);

    }

}

const getListArticleHanle = async() =>{
    try {

        const query = `SELECT * FROM article`;
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