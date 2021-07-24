const db = require('../config/db_config');
const mysql = require('mysql2')

exports.getAllPost = (req, res, next) => {
    db.query("SELECT * FROM posts", (err, data) => {
      if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
      res.send(data);
    })
}

exports.createPost = (req, res, next) => {
    console.log(req.body.post);
    db.query(`INSERT INTO posts (post, user_id, data_of_post) VALUES (?, ?, CURRENT_TIMESTAMP)`, [req.body.post, req.body.user_id], 
    (err, data) => {
      if (err) { return res.status(400).json({ err }) };
      console.log(err);
      res.status(201).json({ message: 'Votre message a été posté !'});
    });
}

exports.modifyPost = (req, res, next) => {
    const postId = req.params.id;
    db.query(`SELECT user_id FROM posts WHERE id = ?`, [postId], (err, data) => {
        if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
        if (data[0].user_id != req.body.userId) {
        res.status(400).send({ message: "modification impossible : ce message appartient à un autre utilisateur." })
        };
        if (data[0].user_id == req.body.userId) {
        db.query(`UPDATE posts SET post = ? WHERE id = ?`, [req.body.post, req.params.id], (err, data) => {
            if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
            res.status(200).json({ message: 'Votre message a été modifié !'});
        })
        }
    })
}

exports.deletePost = (req, res, next) => {
    // récupération du user_id du post et comparaison à l'id de l'utilisateur connecté
    db.query(`SELECT user_id FROM posts WHERE id = ?`, [req.params.id], (err, data) => {
        if (err) { return res.status(400).send({ message: "une erreur est survenue." }) };
        const post_user_id = data[0].user_id;
        if (((post_user_id == req.body.userId) && (req.body.admin == 0)) || req.body.admin != 0) {
            db.query(`DELETE FROM posts WHERE id = ?`, [req.params.id], (err, data) => {
                if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
                res.status(200).json({ message: 'Le message a été supprimé !'});
            })
        }
        if ((post_user_id != req.body.userId) && (req.body.admin == 0)) {
            return res.status(400).send({ message: "Vous ne pouvez pas supprimer ce message, il appartient à un autre utilisateur." })
        }
    })
    
}