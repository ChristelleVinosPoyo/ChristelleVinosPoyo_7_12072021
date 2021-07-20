const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/db_config');
require('dotenv').config();
const userCtrl = require('../controllers/user');


router.get('/:id', userCtrl.getUser);
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;