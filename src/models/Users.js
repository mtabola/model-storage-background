const { model, 
        Schema, 
        Schema: {Types: {ObjectId}} 
    } = require("mongoose")

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
    passwordHash: {
        type: String,
        default: ''
    },
    passwordSalt: {
        type: String,
        default: ''
    },
    roleId: {
        type: ObjectId,
        ref: 'Roles'
    }
})

module.exports = model('Users', schema)