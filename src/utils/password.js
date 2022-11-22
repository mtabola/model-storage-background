const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

//const privKey = fs.readFileSync(path.join(__dirname, '..', 'keys/rsa.priv.pem'), 'utf8')

function genPassHash (password) {
    var salt = crypto.randomBytes(32).toString('hex')
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

    return {
        passHash: genHash,
        passSalt: salt
    }
}


function validPassHash(password, hash, salt) {
    var verified = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return verified === hash
}


module.exports.genPassHash = genPassHash
module.exports.validPassHash = validPassHash