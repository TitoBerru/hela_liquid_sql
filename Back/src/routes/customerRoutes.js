const express = require('express');
const router = express.Router();
const customerController = require ('../controllers/customerController')

/* GET recipes */
router.get('/', customerController.index);
router.get('/create', customerController.create);
// router.get('/edit/:id', costsController.edit)

// router.get('/all', costsController.allCosts);
// router.get('/costoVenta', costsController.costoVenta);


/* PUT POST AND DELETE */
router.post('/create', customerController.storeCustomer);
// router.put('/edit/:id', costsController.updateCosts);

// router.post('/calculate/:id?', costsController.calculate);



module.exports = router;