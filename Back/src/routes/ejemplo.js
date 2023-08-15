const express = require('express');
// const { render } = require('../../app');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ejemploFOR', { title: 'Express' });
});

module.exports = router;
