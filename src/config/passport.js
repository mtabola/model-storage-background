const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/Users')
const path = require('path')
const fs = require('fs')

const pubKey = fs.readFileSync(path.join(__dirname, '../keys/rsa.pub.pem'), 'utf-8')

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: pubKey,
	algorithms: ['RS256']
}

module.exports = (passport) => {
	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.sub }, function (err, user) {
			if (err) {
				return done(err, false)
			}
			if (user) { //здесь сделать рефреш токена?
				return done(null, user)
			} else {
				return done(null, false)
				// or you could create a new account
			}
		})
	}))
}
