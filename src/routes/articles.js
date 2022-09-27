const router = require('express-promise-router')()

const { articles } = require('../controllers')

router.route('/:id').get(articles.get)
router.route('/').post(articles.create)
router.route('/').get(articles.getAll)
router.route('/:id').put(articles.update)
router.route('/:id').delete(articles.delete)

module.exports = router
