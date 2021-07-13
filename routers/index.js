const expess = require('express');

const router = expess.Router();

router
	.use('/products', require('./products'))

;

module.exports = router;