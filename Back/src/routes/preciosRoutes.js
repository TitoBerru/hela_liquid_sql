const express = require('express');
const router = express.Router();
const preciosController = require ('../controllers/preciosController')


/* GET recipes */
router.get('/', preciosController.allPrices);





module.exports = router;