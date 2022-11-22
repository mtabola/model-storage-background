const router = require('express-promise-router')()
const {auth} = require('../controllers')
const passport = require('passport')
const { get } = require('../controllers/users.controller')


router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

router.route('/signup').post(auth.signUp)
router.route('/login').post(auth.login)

module.exports = router