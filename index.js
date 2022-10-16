const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')

const { routes } = require("./src/routes");

//настройка подключения к бд
require('./src/config/database')
// инициализация приложения
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//  объяввление роутов
routes.forEach((item) => {
    app.use(`/${item}`, require(`./src/routes/${item}`));
  });



// запуск сервера
http.createServer({}, app).listen(3001)
console.log('Server is running')