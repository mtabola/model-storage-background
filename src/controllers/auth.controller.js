const {Users} = require('../models')
const TokenUtils = require('../utils/token')
const {genPassHash, validPassHash} = require('../utils/password')

module.exports = {
    async login ({body: {email, password}}, res) {
        try {
            Users.findOne({email}).then(async (user) =>
            {
                if(!user) {
                    return res.status(401).json({success: false, message: 'User is not defined, please check the email or password'})
                }
                const validPass = validPassHash(password, user.passwordHash, user.passwordSalt)
                if(!validPass) {
                    return res.status(401).json({success: false, message: 'User is not defined, please check the email or password'})
                }
                else {
                    const tokenPayload = {
                        id: user.id,
                        fname: user.fname,
                        sname: user.sname
                    }

                    const tokens = TokenUtils.tokenGeneratePair(tokenPayload)
                    await TokenUtils.tokenSave(user.id, tokens.refreshToken)
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 14 * 24 * 60 * 60 * 1000, httpOnly: true})
                    return res.status(200).json({...tokens})
                }
            })
        }
        catch(err){
            res.json({success: false, msg: err.message });
        }
    },


    async signUp({body: {fname, sname, email, password}}, res) { //потом сюда нужно добавть генерацию токена и редирект на страницу, куда он хотел зайти
        try {
            if(await Users.findOne({email})){
                return res.status(403).send({
                    err:{message: 'This email currently used'}
                  })
            }
            const hash = genPassHash(password)

            const newUser = new Users({
                fname: fname,
                sname: sname,
                email: email,
                passwordHash: hash.passHash,
                passwordSalt: hash.passSalt
            })

            newUser.save().then((user) => {
                res.json({success: true, user: user})
            })

        }
        catch(err) {
            res.json({success: false, msg: err.message });
        }
    },

    async refresh() {// это получаестя, что в параметрах он должен принимать куку, и смотреть ее refreshToken
        //Будет костыль, но суть такова: когда у пользователя заканчивается accessToken, то брать его 
        //и перенаправлять на автоматическую ссылку, чтобы обновить токен, а потом его снова переадресовывать обратно
        //на ту страницу, куда он и изначально хотел зайти
    }

}