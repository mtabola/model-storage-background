const { model, Schema, Schema: {Types: {ObjectId}} } = require("mongoose")

const schema = new Schema({
    fname: {
        type: String,
        default: ''
    },
    sname: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: { // так, хорошо, а как сделать его более безопасным?
        type: String,
        default: ''
    },
    roleId: {
        type: ObjectId,
        ref: 'Roles'
    }
})

module.exports = model('Users', schema)