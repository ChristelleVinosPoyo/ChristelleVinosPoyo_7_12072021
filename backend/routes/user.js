const express = require('express');
const router = express.Router();
require('dotenv').config();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.get('/', auth, userCtrl.getAllUser);
router.get('/:id', auth, userCtrl.getUser);
router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);
// test
router.post('/userId', userCtrl.getUserId);

module.exports = router;