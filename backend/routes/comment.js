const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/db_config');
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.get('/', commentCtrl.getAllComment);
router.post('/', auth, commentCtrl.createComment);
router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;