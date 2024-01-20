const express = require('express');
const router = express.Router();
const comprasController = require ('../controllers/comprasController')

/* GET recipes */
router.get('/', comprasController.list);
router.post('/registro', comprasController.registroCompra);

module.exports = router;