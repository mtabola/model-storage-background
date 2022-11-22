const { Tokens } = require('../models')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

module.exports = {
    generateTokenPair(payload) {
        const privKeyAccess = fs.readFileSync(path.join(__dirname, '../keys/rsa.priv.pem'), 'utf-8')
       
        const accessToken = jwt.sign(payload, privKeyAccess, {expiresIn: '1m', algorithm: 'RS256'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {expiresIn: '14d'})
        
        return {
            at: 'Bearer ' + accessToken,
            rt: refreshToken
        }
    },

    async saveToken(userId, refreshToken) {
        const existToken = await Tokens.findOne({userId: userId})
        if(existToken) {
            await Token.findByIdAndUpdate(existToken._id, {refreshToken: refreshToken})
             return {success: true, operaton: 'update'}
        }
        const newToken = new Tokens({userId: userId, refreshToken: refreshToken})
        await newToken.save()
        return {success: true, opreration: 'create'}
    }
}