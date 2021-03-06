// imports
const express = require('express');
const path = require('path'); // donne accès au chemin du système de fichiers
/* application express */

// instanciation server
const app = express();

// import des routeurs express
const userRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');

// gestion des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'autoriser l'ajout des headers donnés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // permet l'envoi de requêtes utilisant les méthodes données
    next();
});

app.use(express.urlencoded({ extended: true, limit: "1kb" })); // parse les requêtes de type application/x-www-form-urlencoded
app.use(express.json({ limit: "1kb" })); // parse le body des requêtes de type application/json et limite leur taille à 1kb

app.use('/files', express.static(path.join(__dirname, 'files'))); // lorsque la route /files est appelée permet de servir le dossier static files
app.use('/api/users', userRoutes);
app.use('/api/articles', articlesRoutes);

module.exports = app;