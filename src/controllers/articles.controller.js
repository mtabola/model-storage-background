const genericCrud = require('./generic.controller')
const { Articles } = require('../models')

module.exports = {
    ...genericCrud(Articles)
}