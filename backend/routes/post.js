const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/db_config');
const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;