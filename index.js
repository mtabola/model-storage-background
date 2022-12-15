const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const { routes } = require("./src/routes");
const passport = require('passport')

//настройка подключения к бд
require('./src/config/database')
//настройка passport
require('./src/config/passport')(passport)
// инициализация приложения
const app = express()
app.use(passport.initialize())
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

//  объяввление роутов
routes.forEach((item) => {
    app.use(`/${item}`, require(`./src/routes/${item}`));
  });



// запуск сервера
http.createServer({}, app).listen(3001)
console.log('Server is running')