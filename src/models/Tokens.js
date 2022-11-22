const { model, 
    Schema, 
    Schema: {Types: {ObjectId}} 
} = require("mongoose")

const schema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'Users'
    },
    refreshToken: {
        type: String,
        default: '',
        maxLength: 512
    }
})

module.exports = model('Tokens', schema)