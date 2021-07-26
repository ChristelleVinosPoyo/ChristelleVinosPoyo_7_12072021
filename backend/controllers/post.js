const db = require('../config/db_config');
const mysql = require('mysql2')
const jwt = require('jsonwebtoken');

exports.getAllPost = (req, res, next) => {
    db.query("SELECT * FROM posts", (err, data) => {
      if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
      res.send(data);
    })
}

exports.createPost = (req, res, next) => {
    console.log(req.body.post);
    db.query(`INSERT INTO posts (post, user_id, data_of_post) VALUES (?, ?, CURRENT_TIMESTAMP)`, [req.body.post, req.body.userId], 
    (err, data) => {
      if (err) { return res.status(400).json({ err }) };
      console.log(err);
      res.status(201).json({ message: 'Votre message a été posté !'});
    });
}

exports.modifyPost = (req, res, next) => {
    // vérification du userId de la requête (qu'il corresponde bien au user_id du post)
    const postId = req.params.id;
    const userId = req.body.userId;
    db.query(`SELECT user_id FROM posts WHERE id = ?`, [postId], (err, data) => {
        const postUserId = data[0].user_id
        console.log(postUserId);
        if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
        if (postUserId != userId) {
        res.status(400).send({ message: "modification impossible : ce message appartient à un autre utilisateur." })
        };
        // modification du message :
        if (postUserId === userId) {
        db.query(`UPDATE posts SET post = ? WHERE id = ?`, [req.body.post, postId], (err, data) => {
            if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
            res.status(200).json({ message: 'Votre message a été modifié !'});
        })
        }
    })
}

exports.deletePost = (req, res, next) => {
    // recupération du userId du front à partir du TOKEN :
    const token = req.headers.authorization.split(' ')[1]; 
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = decodedToken.userId; 
    console.log(userId);
    // récupération du user_id du post
    db.query(`SELECT user_id FROM posts WHERE id = ?`, [req.params.id], (err, data) => {
      const postUserId = data[0].user_id;
      if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
      // récupération du niveau admin à partir du userId :
      db.query(`SELECT admin FROM users WHERE id = ?`, [userId], (err, data) => {
        const admin = data[0].admin;
        if ((postUserId != userId) && (admin === 0)) {
            return res.status(400).send({ message: "Vous ne pouvez pas supprimer un message qui ne vous appartient pas." })
          }
        if (((postUserId === userId) && (admin === 0)) || admin != 0){
        db.query(`DELETE FROM posts WHERE id = ?`, [req.params.id], (err, data) => {
            if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
            res.status(200).json({ message: 'Le message a été supprimé !'});
        })
        }
      })
    });
}