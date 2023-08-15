const express = require('express');
const router = express.Router();
const recipesController = require ('../controllers/recipesController')

/* GET recipes */
router.get('/', recipesController.list);
router.get('/search', recipesController.search);
router.get('/create', recipesController.create);
router.get('/edit/:id', recipesController.edit);
router.get('/detail/:id', recipesController.detail)

//Edit Recipes - method: PUT 
router.put('/edit/:id', recipesController.updateRecipe)

//delete Recipes 
router.delete('/delete/:id', recipesController.deleteRecipe)

// Create recipes - Method: POST 
router.post('/create', recipesController.storeRecipe);
module.exports = router;