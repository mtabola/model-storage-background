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
    previewImage: {
        type: String,
        default: ''
    },
    authorId: {
        type: ObjectId,
        ref: 'Users'
    }
})

module.exports = model('Articles', schema)