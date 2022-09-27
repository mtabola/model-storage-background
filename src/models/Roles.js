const { model, Schema, Schema: {Types: {ObjectId}} } = require("mongoose")

const schema = new Schema({
    roleName: {
        type: String,
        default: ''
    },
    
    // roleId: { а нужно ли это? мне же не обязательно это делать  1:М
    //     type: ObjectId,
    //     ref: 'Roles'
    // }
})

module.exports = model('Roles', schema)