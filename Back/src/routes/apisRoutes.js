const express = require('express');
const router = express.Router();
const recipesController = require ('../controllers/recipesController');
const apisController = require('../controllers/apisController');


//    RECETAS
router.get('/recipes', apisController.recipes); // TOdas las recetas
router.get('/recipes/detail/:id', apisController.recipeDetail) //Detalle Recetas
router.post('/recipes/create', apisController.storeRecipe); // Crear Receta sin aromas
router.get('/recipes/deleteRecipe/:id', apisController.deleteRecipe) // Borrar Receta

// Sin usar
router.get('/create', apisController.create); // 
router.get('/search', apisController.search);
router.get('/edit/:id', apisController.edit);

//  VENTAS
router.get('/sales', apisController.sales) // Todas
router.get('/salesLast', apisController.salesLast) // ultima Venta

//  CLIENTES
router.get('/customer', apisController.customer)

// TESTEO POST DESDE apisPost
router.get('/customer', apisController.customer)

module.exports = router;