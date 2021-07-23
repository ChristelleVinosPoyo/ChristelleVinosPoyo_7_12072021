const mysql = require('mysql2');
const db = require('../config/db_config'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUser = (req, res, next) => {
  db.query(`SELECT firstname, lastname, age, picture FROM users` , (err, data) => {
    if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
    res.send(data);
  })
}

exports.getUser = (req, res, next) => {
  db.query(`SELECT firstname, lastname, age, picture FROM users WHERE id = ${req.params.id}` , (err, data) => {
    if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
    res.send(data);
  })
}

exports.signup = (req, res, next) =>{
  bcrypt.hash(req.body.password, 10) // 10 tours d'execution de l'algorythme de hashage
  .then(hash => {
      console.log(hash);
      db.query(`INSERT INTO users (id, firstname, lastname, email, password, age, picture) VALUES (NULL, '${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hash}', ${req.body.age}, '${req.body.picture}')`, (err, data) => {
      if (err) { return res.status(400).json({ err }) };
      res.status(200).json({ message: 'Votre compte a bien été créé !'});
      }
      )
  })
}

exports.login = (req, res, next) => {
  // rechercher du hash dans la BDD
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, data) => {
      if (err) { return res.status(400).send({ message: "utilisateur non trouvé !" }) };
      console.log(data);
      bcrypt.compare(req.body.password, data[0].password)
      .then(valid => {
      console.log(data);
      if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect ! ' })
      }
      // res.status(200).send({ message: "utilisateur connecté !" })
      res.status(200).json({ 
          userId: data[0].id,
          admin: data[0].admin,
          token: jwt.sign( // le token sécurise l'échange des données : il valide le droit de l'utilisateur à accéder aux ressources
              { userId: data[0].id }, // 1er argument : ce qu'on veut encoder
              process.env.TOKEN_KEY, // 2eme argument : clé secrète d'encodage
              { expiresIn: '24h' } // 3ème argument : chaque token durera 24h
          )
      })
      });
  })
  }

exports.deleteUser = (req, res, next) => {
  console.log(req.body);
  if (((req.params.id == req.body.userId) && (req.body.admin == 0)) || req.body.admin != 0) {
      db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, data) => {
          if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
          res.status(200).json({ message: 'Le compte utilisateur a été supprimé !'});
      })
  }
  if ((req.params.id != req.body.userId) && (req.body.admin == 0)) {
      return res.status(400).send({ message: "Vous ne pouvez pas supprimer un compte utilisateur qui ne vous appartient pas." })
  }
}
