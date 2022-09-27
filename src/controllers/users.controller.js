const genericCrud = require('./generic.controller')
const { Users } = require('../models')

module.exports = {
    ...genericCrud(Users)
}