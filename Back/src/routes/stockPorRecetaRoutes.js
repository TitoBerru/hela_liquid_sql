const express = require('express');
const router = express.Router();
const salesController = require ('../controllers/stockPorRecetaController');
const stockPorRecetaController = require('../controllers/stockPorRecetaController');

/* GET recipes */
router.get('/', stockPorRecetaController.query);

module.exports = router;