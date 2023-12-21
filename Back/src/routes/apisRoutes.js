const express = require('express');
const router = express.Router();
const recipesController = require ('../controllers/recipesController');
const apisController = require('../controllers/apisController');

router.get('/', apisController.list);
router.get('/search', apisController.search);
router.get('/create', apisController.create);
router.get('/edit/:id', apisController.edit);
router.get('/detail/:id', apisController.detail)
router.post('/create', apisController.storeRecipe);

module.exports = router;