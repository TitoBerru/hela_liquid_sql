var express = require('express');
var router = express.Router();
const usersController = require ('../controllers/usersController')

/* GET users  */
router.get('/', usersController.index);
router.get('/register', usersController.register)

router.post('/register', usersController.storeUser)

module.exports = router;
