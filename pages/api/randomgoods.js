import db from "../../database";
import { articles } from "../../articles";



export default async function handler(req, res) {

    let arr = []
    for(let i = 0; i < 12; i++) {
        arr.push(Math.floor(Math.random()*1500))
    }

    let articlesArray = []
    arr.forEach((el)=>{
        articlesArray.push(articles[el])
    })

   async function myQuery(connection) {
    await connection.query(`SELECT * FROM goods WHERE article IN (`+ articlesArray.join(',') + `)`, (error, goods)=> {
            if(error) {
                console.log('Произошла ошибка при запросе', error)
            } else {
                let allGoods = {}

                Object.keys(goods).forEach((el)=> {
                    let good = {
                        id: goods[el].id,
                        name: goods[el].name,
                        description: goods[el].description,
                        price: goods[el].price,
                        article: goods[el].article,
                        category: goods[el].category,
                        images: JSON.parse(goods[el].images),
                        kinds: JSON.parse(goods[el].kinds)
                    }
                    allGoods[goods[el].article] = good
                })
            
                res.json({"goods": allGoods})
            }
    })  
   }

   db(myQuery)
}