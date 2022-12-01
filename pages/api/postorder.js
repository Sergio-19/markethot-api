import YooKassa from 'yookassa'
import config from '../../my.config';
import mysql from 'mysql'



export default async function handler(req, res) {
    const order = JSON.parse(req.body.order)
        const goods =  JSON.stringify(order.goods)

        const yooKassa = new YooKassa({
            shopId: config.shopid,
            secretKey: config.apikey
        });

        const payment = await yooKassa.createPayment({
            amount: {
              value: `${order.sum}.00`,
              currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
              type: "redirect",
              return_url: "https://hopastore.ru"
            },
            description: `Заказ №${order.order}, ${order.email || ''}`
        });


      if(req.body.order) {

        const connection =  await mysql.createConnection({
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        })
    
        await connection.connect((error)=> {
            if(error){
                return console.log('Ошибка подключения к базе данных!')
            } else {
                return console.log('Подключение успешно')
            }
            })

        await connection.query(`INSERT INTO orders (number, goods) VALUES ('${order.order}', '${goods}')`, (error)=> {
            if(error){
                console.log(error, 'Ошибка при добавлении заказа в таблицу orders')
            } else {
                console.log(`Заказ №${order.order} сохранен в базе данных`)
               
            }

        })   
        
        let user = new Promise((resolve, reject)=> {
            connection.query(`SELECT * FROM users WHERE email = '${order.email}'`, (error, result)=> {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)       
                }
            })
        })

        let user2 = new Promise((resolve, reject)=> {
            connection.query(`INSERT INTO users (name, phone, email, address, orders) 
            VALUES ('${order.name}', '${order.phone}', '${order.email}', '${order.address}', '${order.order}')`, (error, result)=> {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)       
                }
            })
        })

        let user3 = new Promise((resolve, reject)=> {
            connection.query(`UPDATE users SET name = '${order.name}', phone = '${order.phone}', email = '${order.email}', 
            address = '${order.address}', orders = '${order.order}'  WHERE email LIKE '${order.email}'`, (error, result)=> {
                if(error) {
                    reject(error)
                } else {
                    resolve(result)       
                }
            })
        })

        user.then((value)=>{
            if(value.length === 0){
                user2.then((dat)=>{
                    console.log(dat)
                })
            } else {
                user3.then((dat)=>{
                    console.log(dat)
                })
            }
        })

       
        res.json({'message': `Заказ № ${order.order} сохранен в базе данных`, 
                  "payment": payment,
                  "order": order  
                })

        await connection.end((error)=> {
            if(error){
                console.log(`Ошибка ${error}`)
            } else {
                console.log('Подключение закрыто')
            }
        })


      } else {
        res.json({'message': 'Пустой заказ'})
        console.log('Пустой запрос')
      }
}