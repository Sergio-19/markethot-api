import mysql from 'mysql'
import config from './my.config'

export default async function db(queryFunction) {
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

await queryFunction(connection)

await connection.end((error)=> {
    if(error){
        console.log(`Ошибка ${error}`)
    } else {
        console.log('Подключение закрыто')
    }
})
}

