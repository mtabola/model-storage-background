const router = require('express-promise-router')()

const { roles } = require('../controllers')

router.route('/:id').get(roles.get)
router.route('/').post(roles.create)
router.route('/').get(roles.getAll)
router.route('/:id').put(roles.update)
router.route('/:id').delete(roles.delete)

module.exports = router
