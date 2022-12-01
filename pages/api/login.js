import db from "../../database";



export default async function handler(req, res) {
    const {email} = req.body
        
    async  function myQuery(connection) {
        await connection.query(`SELECT * FROM users WHERE email = '${email}'`, (error, result)=> {
            if(error){
                console.log(error)
            } else {
                if(result.length === 0){
                 res.json({"message": 'Похоже вы у нас впервые, после первого заказа ваши персональные данные и информация о заказах будут сохранены в вашем профиле.', "success": false})   
                } else {
                    res.json({"user": result[0], "success": true, "token": 'kskahsjqhuwyquy&wuywuyu?gas###qyt'})
                }
                
            }
        })
    }

    db(myQuery)
}