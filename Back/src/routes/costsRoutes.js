const express = require('express');
const router = express.Router();
const costsController = require ('../controllers/costsController')

/* GET recipes */
router.get('/', costsController.index);
router.get('/edit/:id', costsController.edit)

router.get('/all', costsController.allCosts);
router.get('/costoVenta', costsController.costoVenta);


/* PUT POST AND DELETE */
router.put('/edit/:id', costsController.updateCosts);

router.post('/calculate/:id?', costsController.calculate);



module.exports = router;