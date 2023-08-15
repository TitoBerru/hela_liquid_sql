const express = require('express');
const router = express.Router();
const salesController = require ('../controllers/salesController')

/* GET recipes */
router.get('/', salesController.list);
router.get('/salesForCustomer', salesController.customer);
router.get('/salesForMonth', salesController.month);
router.get('/salesForYear', salesController.year);
router.get('/salesForRecipe', salesController.recipe);
router.get('/salesForFlavor', salesController.flavor);

module.exports = router;