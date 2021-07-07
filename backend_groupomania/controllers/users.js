const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
const fs = require('fs');

exports.signup = (req, res, next) => {
    models.User.findOne({ // vérification email
        attributes: ['email'], // attributs que l'on veut récupérer
        where: {email: req.body.email}
    })
    .then(userFound => {
        if(userFound) {
            res.status(409).json({error: 'email déjà utilisé !'}) // 409 : conflit 
        } else {
            models.User.findOne({ // vérification username
                attributes: ['username'],
                where: {username: req.body.username}
            })
            .then(userFound => {
                if(userFound) {
                    res.status(409).json({error: "nom d'utilisateur déjà utilisé !"}); 
                } else {
                    bcrypt.hash(req.body.password, 10) // cryptage du mot de passe 
                    .then(hash => {
                        models.User.create({ // création du nouvel utilisateur 
                            email: req.body.email,
                            username: req.body.username,
                            password: hash,
                            isadmin: 0 
                        })
                        .then(user => {
                            const token = jwt.sign(
                                {userid: user.id}, //payload
                                'superclesecrete', //process.env.SECRET_KEY
                                {expiresIn: '24h'}
                            )
                            res.status(201).json({user, token})})
                        .catch(() => res.status(500).json({error: "impossible de créer le compte utilisateur"}));
        
                    })
                    .catch(() => res.status(500).json({error: "impossible de crypter le mot de passe !"})); 
                }
            })
            .catch(() => res.status(500).json({error: "impossible de vérifier le nom d'utilisateur !"}));
        }
    })
    .catch(() => res.status(500).json({error: 'impossible de valider le mail'}));
};

exports.login = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({error: "paramètre manquant !"});
    }
    models.User.findOne({
        where: {email: req.body.email}
    })
    .then(user => {
        if(!user) {
            res.status(401).json({error: 'utilisateur non trouvé !'})
        } 
        bcrypt.compare(req.body.password, user.password) // retourne true ou false
        .then(valid => {
            if(!valid) {
                res.status(401).json({error: 'mot de passe incorrect !'})
            } else {
                res.status(200).json({
                    user,
                    token: jwt.sign(
                        {userid: user.id}, //payload
                        'superclesecrete', //process.env.SECRET_KEY
                        {expiresIn: '24h'}
                    )
                });
            }
        })
        .catch(() => res.status(500).json({error: 'impossible de vérifier le mot de passe !'}));
    })
    .catch(() => res.status(500).json({error: 'impossible de rechercher cet utilisateur !'}));
};

exports.deleteAccount = (req, res, next) => {
    models.User.findOne({
        where: {id: req.body.userid},
        attributes: ['id']
    })
    .then(user => {
        if(!user) {
            return res.statut(404).json({error: 'utilisateur non trouvé !'});
        }
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
                                return res.status(201).json({message: 'compte utilisateur supprimé'});
                            })
                            .catch(() => res.status(500).json({error: 'impossible de supprimer le compte utilisateur !'}))
                        })
                    }
                })
            }
            user.destroy()
            .then(() => {
                return res.status(201).json({message: 'compte utilisateur supprimé'});
            })
            .catch(() => res.status(500).json({error: 'impossible de supprimer le compte utilisateur !'}))
        })
        .catch(() => res.status(500).json({error: 'impossible de rechercher les articles publiés !'}));
    })
    .catch(() => res.status(500).json({error: 'impossible de rechercher cet utilisateur !'}));
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
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({error: "mot de passe saisi invalide"})
                } else {
                    models.User.findOne({
                        where: {username: req.body.username},
                        attributes: ['username']
                    })
                    .then(otherUser => {
                        if(otherUser) {
                            return res.status(409).json({error: "nom d'utilisateur déjà utilisé"})
                        } else {
                            user.update({
                                username: (req.body.username ? req.body.username : user.username)
                            })
                            .then(user => res.status(201).json({userid: user.id, username: user.username}))
                            .catch(() => res.status(500).json({error: "impossible de mettre le nom d'utilisateur à jour"}))
                        }
                    })
                    .catch(() => res.status(500).json({error: "impossible de vérifier l'unicité du nom d'utilisateur"}))
                }
            })
            .catch(() => res.status(500).json({error: "impossible de vérifier le mot de passe saisi"}))
        }
    })
    .catch(() => res.status(500).json({error: "impossible de vérifier l'utilisateur"}))
}

/*

       models.User.findOne({
            where: {username: req.body.username},
            attributes: ['username']
        })
        .then(otherUser => {
            if(otherUser) {
                return res.status(409).json({error: "nom d'utilisateur déjà utilisé"})
            } else {
                user.update({
                    username: (req.body.username ? req.body.username : user.username)
                })
                .then(user => {
                    console.log(user);
                    res.status(201).json({user});
                })
                .catch(() => res.status(500).json({error: "impossible de mettre le nom d'utilisateur à jour"}))
            }
        })
        .catch(() => res.status(500).json({error: "impossible de vérifier l'unicité du nom d'utilisateur"}))
    })

    */

