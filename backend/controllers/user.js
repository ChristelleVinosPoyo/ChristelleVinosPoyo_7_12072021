const mysql = require('mysql');
const db = require('../config/db_config'); 

exports.getAllUsers = (req, res, next) => {
    db.query("SELECT * FROM groupomania.users", (err, data) => {
      if (err) { return res.status(400).send({ message: "Une erreur est survenue !" }) };
      res.send(data);
    })
  };
