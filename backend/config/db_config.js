const mysql = require('mysql2');

// connexion à MySQL avec mysql
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 3307,
  database: process.env.DB_NAME //pour ne plus à avoir à le préciser dans chacune des requête SQL
});
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

module.exports = db;