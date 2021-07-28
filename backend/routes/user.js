const express = require('express');
const router = express.Router();
require('dotenv').config();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', userCtrl.getUser);
router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.post('/userId', userCtrl.getUserId); // route qui renvoie le userId à partir du token

module.exports = router;