const express = require('express');
const router = express.Router();
const flavorsController = require ('../controllers/flavorsController')

/* GET recipes */
router.get('/', flavorsController.allFlavors);
router.get('/create', flavorsController.createFlavors);
router.get('/search', flavorsController.search);
router.get('/edit/:id', flavorsController.edit)
router.get('/detail/:id', flavorsController.detail)

/* PUT POST AND DELETE */
router.put('/edit/:id', flavorsController.updateFlavor);
router.post('/create', flavorsController.storeFlavors);
router.delete('/delete/:id', flavorsController.deleteFlavor);




module.exports = router;