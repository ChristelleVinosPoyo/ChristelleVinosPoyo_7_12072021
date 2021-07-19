const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');

// const path = require('path');
// const helmet = require('helmet');
// const rateLimit = require("express-rate-limit"); // pour limiter le nombres d'appels faits à l'API
// const limiter = rateLimit({
  //   windowMs: 15 * 60 * 1000, // 10 minutes
  //   max: 100 // Le client pourra faire 100 requêtes toutes les 10 minutes
  // });
  
  
  // const userRoutes = require('./routes/user'); 
  
  const app = express();

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


// Pour permettre à l'appli d'acceder à l'API et eviter les erreurs CORS
app.use((req, res, next) => {  //Middleware general appliqué à toutes les routes. 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// sécurité
app.use(express.json()); // pour parlier à l'utilisation de bodyparser qui est déprécié 
// app.use(helmet());
// app.use(limiter);

// route vers les ressources du dossier static (local) 'images'
//app.use('/images', express.static(path.join(__dirname, 'images'))); // express.static pour servir le dossier statique 'images' / path.join pour créer un chemin dynamique vers l'image souhaitée

// routes vers les ressources de la BD
// app.use('/api/users', userRoutes);


// GetAllPost - fonctionne
app.get('/api/posts', (req, res, next) => {
  db.query("SELECT * FROM posts", (err, data) => {
    if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
    res.send(data);
  })
});

// GetUser
app.get('/api/users/:id', (req, res, next) => {
  db.query(`SELECT * FROM users WHERE id = ${req.params.id}` , (err, data) => {
    if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
    res.send(data);
    console.log(data);
  })
});

// CreatePost - fonctionne
app.post('/api/posts', (req, res, next) => {
  console.log(req.body.post);
  db.query(`INSERT INTO posts (id, post, user_id, data_of_post) VALUES (NULL, ${mysql.escape(req.body.post)}, '${req.body.user_id}', CURRENT_TIMESTAMP)  `, 
  (err, data) => {
    if (err) { return res.status(400).json({ err }) };
    console.log(err);
    res.status(200).json({ message: 'Votre message a été posté !'});
  });
});


//signup - Fonctionne 
app.post('/api/users/signup', (req, res, next) =>{
  bcrypt.hash(req.body.password, 10) // 10 tours d'execution de l'algorythme de hashage
  .then(hash => {
    console.log(hash);
    db.query(`INSERT INTO users (id, firstname, lastname, email, password, age, picture) VALUES (NULL, '${req.body.firstname}', '${req.body.lastname}', '${req.body.email}', '${hash}', ${req.body.age}, '${req.body.picture}')`, (err, data) => {
      if (err) { return res.status(400).json({ err }) };
      res.status(200).json({ message: 'Votre compte a bien été créé !'});
    }
    )
  })
})

//login - ne fonctionne pas - pb avec jsonwebtoken
app.post('/api/users/login', (req, res, next) => {
  // rechercher du hash dans la BDD
  db.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (err, data) => {
    if (err) { return res.status(400).send({ message: "utilisateur non trouvé !" }) };
    console.log(data);
    bcrypt.compare(req.body.password, data[0].password)
    .then(valid => {
      console.log(valid);
      if (!valid) {
        return res.status(401).json({ error: 'Mot de passe incorrect ! ' })
      }
      // res.status(200).send({ message: "utilisateur connecté !" })

      res.status(200).json({ 
          userId: data[0].user_id,
          token: jwt.sign( // le token sécurise l'échange des données : il valide le droit de l'utilisateur à accéder aux ressources
              { userId: data[0].user_id }, // 1er argument : ce qu'on veut encoder
              process.env.TOKEN_KEY, // 2eme argument : clé secrète d'encodage
              { expiresIn: '24h' } // 3ème argument : chaque token durera 24h
          )
      })
    });
  })
});
  
  //modifyPost
  app.put('/api/posts/:id', (req, res, next) => {
    db.query(`SELECT user_id FROM posts WHERE id = ${req.params.id}`, (err, data) => {
      if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
      if (data[0].user_id != req.body.userId) {
        res.status(400).send({ message: "modification impossible car ce message appartient à un autre utilisateur." })
      };
      if (data[0].user_id == req.body.userId) {
        db.query(`UPDATE posts SET post = '${req.body.post}' WHERE id = ${req.params.id}`, (err, data) => {
          if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
          res.status(200).json({ message: 'Votre message a été modifié !'});
        })
      }
    })
  });
  
  // deletePost - fonctionne
  app.delete('/api/posts/:id', (req, res, next) => {
    db.query(`DELETE FROM posts WHERE id = ${req.params.id}`, (err, data) => {
      if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
      res.status(200).json({ message: 'Votre message a été supprimé !'});
    })
  });
  
// deleteUser - fonctionne
app.delete('/api/users/:id', (req, res, next) => {
  db.query(`DELETE FROM users WHERE id = ${req.params.id}`, (err, data) => {
    if (err) { return res.status(400).send({ message: "une erreur est survenue !" }) };
    res.status(200).json({ message: 'Votre compte a été supprimé !'});
  })
});
  
  // const { Sequelize } = require('sequelize');
// connexion à MySQL avec Sequelize
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   dialect: "mysql",
//   host: "localhost",
//   port: 3307
// });
// try {
//   sequelize.authenticate();
//   console.log('Connecté à la base de données MySQL!');
// } catch (error) {
//   console.error('Impossible de se connecter, erreur suivante :', error);
// }

module.exports = app;