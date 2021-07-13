const express = require('express');
const { Sequelize } = require('sequelize');
// const path = require('path');
require('dotenv').config();
// const helmet = require('helmet');
// const rateLimit = require("express-rate-limit"); // pour limiter le nombres d'appels faits à l'API
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 10 minutes
//   max: 100 // Le client pourra faire 100 requêtes toutes les 10 minutes
// });


const userRoutes = require('./routes/user'); 
const postRoutes = require('./routes/post');

const app = express();

// connexion à MySQL avec Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, "root", "root", {
  dialect: "mysql",
  host: "localhost",
  port: 3307
});
try {
  sequelize.authenticate();
  console.log('Connecté à la base de données MySQL!');
} catch (error) {
  console.error('Impossible de se connecter, erreur suivante :', error);
}

// Pour permettre à l'appli d'acceder à l'API et eviter les erreurs CORS
app.use((req, res, next) => {  //Middleware general appliqué à toutes les routes. 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// sécurité
// app.use(express.urlencoded()); // pour parlier à l'utilisation de bodyparser qui est déprécié : permet de transformer req.body en JS utilisable
app.use(express.json()); // pour parlier à l'utilisation de bodyparser qui est déprécié 
// app.use(helmet());
// app.use(limiter);

// route vers les ressources du dossier static (local) 'images'
//app.use('/images', express.static(path.join(__dirname, 'images'))); // express.static pour servir le dossier statique 'images' / path.join pour créer un chemin dynamique vers l'image souhaitée

// routes vers les ressources de la BD
// app.use('/api/user', userRoutes);
// app.use('/api/auth', userRoutes);

module.exports = app;