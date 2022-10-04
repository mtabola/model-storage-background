const { model, Schema, Schema: {Types: {ObjectId}} } = require("mongoose")
const renameIdPlugin = require('mongoose-rename-id');

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
schema.plugin(renameIdPlugin({newIdName: 'id'}))

module.exports = model('Articles', schema)