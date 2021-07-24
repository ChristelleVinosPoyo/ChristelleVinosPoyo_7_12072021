const db = require('../config/db_config');
const mysql = require('mysql2')

exports.getAllComment = (req, res, next) => {
    db.query("SELECT * FROM comments", (err, data) => {
      if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
      res.send(data);
    })
}

exports.createComment = (req, res, next) => {
    db.query(`INSERT INTO comments (comment, post_id, user_id, data_of_comment) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`, [req.body.comment, req.body.post_id, req.body.user_id], 
    (err, data) => {
      if (err) { return res.status(400).json({ err }) };
      console.log(err);
      res.status(201).json({ message: 'Votre commentaire a été posté !'});
    });
}

exports.modifyComment = (req, res, next) => {
    const commentId = req.params.id;
    db.query(`SELECT user_id FROM comments WHERE id = ?`, [commentId], (err, data) => {
        if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
        if (data[0].user_id != req.body.userId) {
        res.status(400).send({ message: "modification impossible : ce commentaire appartient à un autre utilisateur." })
        };
        if (data[0].user_id == req.body.userId) {
        db.query(`UPDATE comments SET comment = ? WHERE id = ?`, [req.body.comment, req.params.id], (err, data) => {
            if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
            res.status(200).json({ message: 'Votre message a été modifié !'});
        })
        }
    })
}

exports.deleteComment = (req, res, next) => {
    // récupération du user_id du commentaire et comparaison à l'id de l'utilisateur connecté
    db.query(`SELECT user_id FROM comments WHERE id = ?`, [req.params.id], (err, data) => {
        if (err) { return res.status(400).send({ message: "une erreur est survenue." }) };
        const comment_user_id = data[0].user_id;
        if (((comment_user_id == req.body.userId) && (req.body.admin == 0)) || req.body.admin != 0) {
            db.query(`DELETE FROM comments WHERE id = ?`, [req.params.id], (err, data) => {
                if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
                res.status(200).json({ message: 'Le message a été supprimé !'});
            })
        }
        if ((comment_user_id != req.body.userId) && (req.body.admin == 0)) {
            return res.status(400).send({ message: "Vous ne pouvez pas supprimer ce message, il appartient à un autre utilisateur." })
        }
    })
    
}