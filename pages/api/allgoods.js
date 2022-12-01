import db from "../../database";



export default function handler(req, res) {
    const category = req.body.category

    async function myQuery(connection) {
        await connection.query(`SELECT * FROM goods WHERE category LIKE '${category}'`, (error, goods)=> {
        if(error){console.log(error)} else {
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
        
            res.status(200).json({"goods": allGoods, "request": category})
        }
    }) 
    }

    async function myQuery2(connection) {
        await connection.query(`SELECT * FROM goods WHERE name LIKE '%${category}%'`, (error, goods)=> {
        if(error){console.log(error)} else {
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
        
            res.status(200).json({"goods": allGoods, "request": category})
        }
    }) 
    }

    if(req.body.met === 'search'){
      db(myQuery2)  
    } else {
        db(myQuery)
    }

  }