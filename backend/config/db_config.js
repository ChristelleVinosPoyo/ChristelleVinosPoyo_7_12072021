const mysql = require('mysql');

// connexion à MySQL avec mysql
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3307
  });
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
  });