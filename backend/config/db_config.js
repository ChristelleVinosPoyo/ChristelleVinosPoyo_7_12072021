const mysql = require('mysql2');

// connexion à MySQL avec mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3307,
  database: 'groupomania' //pour ne plus à avoir à le préciser dans chacune des requête SQL
});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;