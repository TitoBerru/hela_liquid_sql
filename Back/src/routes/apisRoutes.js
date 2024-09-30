const express = require('express');
const router = express.Router();
// const apisController = require('../controllers/apisController');
const apisSalesController = require('../controllers/apisV1/apisSalesController')
const apisCustomerController = require('../controllers/apisV1/apisCustomerController')
const apisRecipesController = require('../controllers/apisV1/apisRecipesController')

//    RECETAS V1
router.get('/v1/recipes', apisRecipesController.recipes) // TOdas las recetas
router.get('/v1/recipes/detail/:id', apisRecipesController.recipeDetail) //Detalle Recetas
router.post('/v1/recipes/create', apisRecipesController.storeRecipe) // Crear Receta sin aromas
router.get('/v1/recipes/deleteRecipe/:id', apisRecipesController.deleteRecipe) // Borrar Receta

//  VENTAS
router.get('/v1/sales', apisSalesController.sales) // Todas
router.get('/v1/salesLast', apisSalesController.salesLast) // ultima Venta

//  CLIENTES
router.get('/v1/customer', apisCustomerController.customer)
// router.get('/customer', apisController.customer)

// TESTEO POST DESDE apisPost
// router.get('/v1/customer', apisController.customer)


// Sin usar
// router.get('/create', apisController.create); // 
// router.get('/search', apisController.search);
// router.get('/edit/:id', apisController.edit);

module.exports = router;