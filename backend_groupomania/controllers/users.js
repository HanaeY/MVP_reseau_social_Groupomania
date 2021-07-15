//imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');

//fonctions exportées
exports.signup = (req, res, next) => {
    // vérification email
    models.User.findOne({ 
        attributes: ['email'], 
        where: {email: req.body.email}
    })
    .then(userFound => {
        if(userFound) {
            res.status(409).json({error: 'email déjà utilisé'}); 
        } else {
            // vérification username
            models.User.findOne({ 
                attributes: ['username'],
                where: {username: req.body.username}
            })
            .then(userFound => {
                if(userFound) {
                    res.status(409).json({error: "nom d'utilisateur déjà utilisé"}); 
                } else {
                    // cryptage du mot de passe
                    bcrypt.hash(req.body.password, 10)  
                    .then(hash => {
                        // création du nouvel utilisateur 
                        models.User.create({ 
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            isadmin: 0 
                        })
                        // création du token d'authentification
                        .then(user => {
                            const token = jwt.sign(
                                {userid: user.id}, //payload
                                process.env.SECRET_KEY, 
                                {expiresIn: '24h'}
                            )
                            res.status(201).json({user: {id: user.id, username: user.username, createdAt: user.createdAt, email: user.email, isadmin: user.isadmin}, token})})
                        .catch(() => res.status(500).json({error: "impossible de créer le compte utilisateur, veuillez essayer ultérieurement"}));
        
                    })
                    .catch(() => res.status(500).json({error: "impossible de crypter le mot de passe, veuillez essayer ultérieurement"})); 
                }
            })
            .catch(() => res.status(500).json({error: "impossible de vérifier le nom d'utilisateur, veuillez essayer ultérieurement"}));
        }
    })
    .catch(() => res.status(500).json({error: "impossible de vérifier l'email, veuillez essayer ultérieurement"}));
};

exports.login = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({error: "paramètre manquant"});
    }
    models.User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if(!user) {
            res.status(404).json({error: 'aucun utilisateur ne correspond à cet email'})
        } 
        bcrypt.compare(req.body.password, user.password) // retourne true ou false
        .then(valid => {
            if(!valid) {
                res.status(401).json({error: 'mot de passe incorrect'})
            } else {
                res.status(200).json({
                    user: {id: user.id, username: user.username, createdAt: user.createdAt, email: user.email, isadmin: user.isadmin},
                    token: jwt.sign(
                        {userid: user.id}, //payload
                        process.env.SECRET_KEY, 
                        {expiresIn: '24h'}
                    )
                });
            }
        })
        .catch(() => res.status(500).json({error: 'impossible de vérifier le mot de passe, veuillez réessayer ultérieurement'}));
    })
    .catch(() => res.status(500).json({error: 'impossible de rechercher cet utilisateur, veuillez réessayer ultérieurement'}));
};

exports.deleteAccount = (req, res, next) => {
    models.User.findOne({
        where: {id: req.body.userid},
        attributes: ['id']
    })
    .then(user => {
        if(!user) {
            return res.statut(404).json({error: 'utilisateur non trouvé'});
        }
        // suppression des images publiées par l'utilisateur du système de fichiers
        models.Article.findAll({
            where: {UserId: user.id},
            attributes: ['file']
        })
        .then(articles => {
            if(articles) {
                articles.forEach(article => {
                    if(article.file) {
                        const filename = article.file.split('/files/')[1];
                        fs.unlink(`./files/${filename}`, () => {
                            user.destroy()
                            .then(() => {
                                return res.status(200).json({message: 'compte utilisateur supprimé'});
                            })
                            .catch(() => res.status(500).json({error: 'erreur, veuillez réessayer ultérieurement'}));
                        })
                    }
                })
            }
            user.destroy()
            .then(() => {
                return res.status(200).json({message: 'compte utilisateur supprimé'});
            })
            .catch(() => res.status(500).json({error: 'erreur, veuillez réessayer ultérieurement'}));
        })
        .catch(() => res.status(500).json({error: 'erreur, veuillez réessayer ultérieurement'}));
    })
    .catch(() => res.status(500).json({error: 'erreur, veuillez réessayer ultérieurement'}));
};

exports.updateUsername = (req, res, next) => {
    models.User.findOne({
        where: {id: req.body.userid},
        attributes: ['id', 'username', 'password']
    })
    .then(user => {
        if(!user) {
            return res.status(404).json({error: "utilisateur non trouvé"})
        } else {
            // vérification du mot de passe actuel
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: "mot de passe saisi invalide"})
                } else {
                    // vérification de l'existance ou non d'un autre utilisateur ayant le même username
                    models.User.findOne({
                        where: {username: req.body.username},
                        attributes: ['username']
                    })
                    .then(otherUser => {
                        if(otherUser) {
                            return res.status(409).json({error: "nom d'utilisateur déjà utilisé"})
                        } else {
                            // mise à jour du compte de l'utilisateur
                            user.update({
                                username: (req.body.username ? req.body.username : user.username)
                            })
                            .then(user => res.status(200).json({userid: user.id, username: user.username}))
                            .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
                        }
                    })
                    .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
                }
            })
            .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
        }
    })
    .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
};

exports.updateEmail = (req, res, next) => {
    models.User.findOne({
        where: {id: req.body.userid},
        attributes: ['id', 'email', 'password']
    })
    .then(user => {
        if(!user) {
            return res.status(404).json({error: "utilisateur non trouvé"})
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: "mot de passe saisi invalide"})
                } else {
                    models.User.findOne({
                        where: {email: req.body.email},
                        attributes: ['email']
                    })
                    .then(otherUser => {
                        if(otherUser) {
                            return res.status(409).json({error: "email déjà utilisé"})
                        } else {
                            user.update({
                                email: (req.body.email ? req.body.email : user.email)
                            })
                            .then(user => res.status(200).json({userid: user.id, email: user.email}))
                            .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
                        }
                    })
                    .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
                }
            })
            .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
        }
    })
    .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
};

exports.updatePassword = (req, res, next) => {
    models.User.findOne({
        where: {id: req.body.userid},
        attributes: ['id', 'password']
    })
    .then(user => {
        if(!user) {
            return res.status(404).json({error: "utilisateur non trouvé"})
        } else {
            bcrypt.compare(req.body.currentPassword, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: "mot de passe saisi invalide"})
                } else {
                    bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        user.update({
                            password: hash
                        })
                        .then(() => res.status(200).json({message: "mot de passe bien mis à jour"}))
                        .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
                    })
                    .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
                }
            })
            .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
        }
    })
    .catch(() => res.status(500).json({error: "erreur, veuillez réessayer ultérieurement"}));
};