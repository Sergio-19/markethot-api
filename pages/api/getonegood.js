import db from "../../database"

export default function handler(req, res) {
    const article = req.body.article


    async function queryGood(connection) {
        await connection.query(`SELECT * FROM goods WHERE article = '${article}'`, (error, result)=> {
            if(error) {
                console.log('Ошибка при запросе к базе данных', error)
            } else {
                let good = {id: result[0].id,
                            name: result[0].name,
                            description: result[0].description,
                            price: result[0].price,
                            article: result[0].article,
                            category: result[0].category,
                            images: JSON.parse(result[0].images),
                            kinds: JSON.parse(result[0].kinds)    
                            }

                            res.status(200).json({"good": good})
            }
        
        }) 
    }


    db(queryGood)
  }