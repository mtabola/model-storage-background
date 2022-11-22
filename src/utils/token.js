const {Tokens} = require('../models')
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')

require('dotenv').config()
class TokenUtils {
    tokenGeneratePair(payload) {
        const privKeyAccess = fs.readFileSync(path.join(__dirname, '../keys/rsa.priv.pem'), 'utf-8')
       
        const accessToken = jwt.sign(payload, privKeyAccess, {expiresIn: '1m', algorithm: 'RS256'})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {expiresIn: '14d'})
        
        return {
            accessToken: 'Bearer ' + accessToken,
            refreshToken: refreshToken
        }
    }

    async tokenSave(id, refreshToken) {
        const existToken = await Tokens.findOne({userId: id})
        if(existToken) {
            await Tokens.findByIdAndUpdate(existToken._id, {refreshToken: refreshToken})
            return {success: true, operaton: 'update'}
        }
        const newToken = new Tokens({userId: id, refreshToken: refreshToken})
        await newToken.save()
        return {success: true, opreration: 'create'}
        
    }

    async tokenFind(refreshToken) {
        return await Tokens.findOne({refreshToken})
    }

    async tokenRemove(refreshToken) {
        return await Tokens.delete({refreshToken})
    }
}

module.exports = new TokenUtils()