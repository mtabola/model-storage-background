const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.DB_CONNECTION, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {console.log('Database connected')})