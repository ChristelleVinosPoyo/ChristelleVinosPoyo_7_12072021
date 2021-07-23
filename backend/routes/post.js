const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/db_config');
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

router.get('/', postCtrl.getAllPost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;