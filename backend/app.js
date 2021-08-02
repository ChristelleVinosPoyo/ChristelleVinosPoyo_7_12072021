const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const path = require('path');
const helmet = require('helmet');
// const rateLimit = require("express-rate-limit"); // pour limiter le nombres d'appels faits à l'API
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 10 minutes
//     max: 200 // Le client pourra faire 200 requêtes toutes les 10 minutes
//   });
  
const postRoutes = require('./routes/post'); 
const userRoutes = require('./routes/user');
const commentRoutes = require('./routes/comment');

const app = express();
  

// Pour permettre à l'appli d'acceder à l'API et eviter les erreurs CORS
app.use((req, res, next) => {  //Middleware general appliqué à toutes les routes. 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// sécurité
app.use(express.json()); // pour parlier à l'utilisation de bodyparser qui est déprécié 
app.use(helmet());
// app.use(limiter);

// route vers les ressources du dossier static (local) 'images'
app.use('/images', express.static(path.join(__dirname, 'images'))); // express.static pour servir le dossier statique 'images' / path.join pour créer un chemin dynamique vers l'image souhaitée

// routes vers les ressources de la BD
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

  
module.exports = app;