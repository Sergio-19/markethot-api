
import db from "../../database";



export default async function handler(req, res) {
    const search = req.body.search
       
     async function myQuery(connection) {
        await connection.query(`SELECT * FROM points WHERE city LIKE '%${search}%' OR address LIKE '%${search}%'`, (error, result)=> {
            if(error) {
                console.log('Ошибка при запросе к базе данных', error)
                res.json({"message": 'Поиск не дал результатов', "success": 'false'})
            } else {
                res.json({"message": "Успешно", "success": result.length === 0 ? false : true, "points": result})
            }
        
        })
     }

     db(myQuery)
}