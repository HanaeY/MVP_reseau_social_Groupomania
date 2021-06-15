const express = require('express');

const app = express();

// gestion des erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // permet l'accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'autoriser l'ajout des headers donnés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // permet l'envoi de requêtes utilisant les méthodes données
    next();
});

app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "1kb" })); // parse le body des requêtes et limite leur taille à 1kb

module.exports = app;