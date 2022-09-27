const genericCrud = require('./generic.controller')
const { Roles } = require('../models')

module.exports = {
    ...genericCrud(Roles)
}