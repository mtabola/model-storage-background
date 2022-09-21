const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')

//настройка подключения к бд
mongoose.connect('mongodb://localhost:27017/model-storage')
// инициализация приложения
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))

//  объяввление роутов

// запуск сервера
http.createServer({}, app).listen(3000)
console.log('Server is running')