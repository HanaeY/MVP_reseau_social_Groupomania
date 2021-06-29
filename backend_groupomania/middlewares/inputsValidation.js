// imports
const fs = require('fs');
//constantes
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/; // 8 caractères min, au moins 1 lettre, 1 chiffre et 1 caractère spécial
const TEXT_REGEX = /^[a-zA-Zéàèïç\d\-_.,!'\s]+$/i

exports.validateUsername = (req, res, next) => {
    if(!req.body.username) {
        return res.status(400).json({'error' : "nom d'utilisateur manquant !"});
    }
    if(req.body.username.length > 13 || req.body.username.length < 3){
        return res.status(400).json({'error' : "le nom d'utilisateur doit comprendre entre 3 et 13 caractères !"});
    }
    if(!TEXT_REGEX.test(req.body.username)) {
        return res.status(400).json({'error' : "le nom d'utilisateur ne doit pas contenir de caractères spéciaux !"});  
    }
    next();
}; 

exports.validateEmail = (req, res, next) => {
    if(!req.body.email) {
        return res.status(400).json({'error' : "email manquant !"});
    }
   if(!EMAIL_REGEX.test(req.body.email)) {
       return res.status(400).json({'error' : "email invalide !"});
   } 
    next();
};

exports.validatePassword = (req, res, next) => {
    if(!req.body.password) {
        return res.status(400).json({'error' : "mot de passe manquant !"});
    }
    if(!PASSWORD_REGEX.test(req.body.password)) {
        return res.status(400).json({'error' : "Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre, un chiffre et un caractère spécial!"});
    }
    next();
};

exports.validateArticle = (req, res, next) => {
    if(!req.body.description || !req.body.userid) {
        fs.unlink(`./files/${req.file.filename}`, () => res.status(400).json({'error': "paramètre manquant !"}));
    } 
    if(req.body.description.length < 1 || req.body.description.length > 300 ) {
        fs.unlink(`./files/${req.file.filename}`, () => res.status(400).json({'error': "le message doit contenir entre 1 et 300 caractères !"}));
    }
    next();
};

exports.validateComment = (req, res, next) => {
    if(!req.body.userid || !req.body.comment) {
        return res.status(401).json({message: 'paramètre manquant !'});
    }
    if(req.body.comment.length < 1 || req.body.comment.length > 500) {
        return res.status(400).json({'error' : "le message doit contenir entre 1 et 500 caractères !"});
    }
    next();
};



