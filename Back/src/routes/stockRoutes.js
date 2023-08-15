const express = require('express');
const router = express.Router();
const stockController = require ('../controllers/stockController')

/* GET recipes */
router.get('/', stockController.list);

module.exports = router;