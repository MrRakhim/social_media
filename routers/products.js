const expess = require('express');
const router = expess.Router();
const controller = require('../controllers/products')

router
	.post('/', controller.createProduct)
	.get('/', controller.getAllProducts)
	.get('/:id', controller.getProductById)
;
module.exports = router;