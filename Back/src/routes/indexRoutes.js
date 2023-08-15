const express = require('express');
// const { render } = require('../../app');
const router = express.Router();
const indexController = require ('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

module.exports = router;