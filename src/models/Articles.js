const { model, Schema, Schema: {Types: {ObjectId}} } = require("mongoose")

const schema = new Schema({
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    dateOfPublication: {
        type: Date,
        default: Date.now()
    },
    author: { // так, хорошо, а как сделать его более безопасным?
        type: ObjectId,
        default: ''
    }
})

module.exports = model('Articles', schema)