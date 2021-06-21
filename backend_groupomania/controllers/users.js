const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    if(email == null || username == null || password == null) {
        res.status(400).json({error: 'paramètre manquant !'});
    };

    models.User.findOne({
        attributes: ['email'], // attributs que l'on veut récupérer
        where: {email: email}
    })
    .then(userFound => {
        if(userFound) {
            res.status(409).json({message: 'email déjà utilisé !'}) // 409 : conflit 
        } else {
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newUser = models.User.create({
                    email: email,
                    username: username,
                    password: hash,
                    isadmin: 0 
                })
                .then(newUser => res.status(201).json({'userid: ' : newUser.id}))
                .catch(() => res.status(500).json({message: "impossible de créer le compte utilisateur"}));

            })
            .catch(error => res.status(500).json({error}));
        }
    })
    .catch(() => res.status(500).json({message: 'impossible de valider le mail'}));
};

exports.login = (req, res, next) => {
    models.User.findOne({
        attributes: ['email', 'password', 'id'], 
        where: {email: req.body.email}
    })
    .then(user => {
        if(!user) {
            res.status(401).json({message: 'utilisateur non trouvé !'})
        } 
        bcrypt.compare(req.body.password, user.password) // retourne true ou false
        .then(valid => {
            if(!valid) {
                res.status(401).json({message: 'mot de passe incorrect !'})
            } else {
                res.status(200).json({
                    userid: user.id,
                    token: jwt.sign(
                        {userid: user.id}, //payload
                        'superclesecrete', //process.env.SECRET_KEY
                        {expiresIn: '24h'}
                    )
                });
            }
        })
        .catch(() => res.status(500).json({message: 'impossible de vérifier le mot de passe !'}));
    })
    .catch(() => res.status(500).json({message: 'impossible de rechercher cet utilisateur !'}));
};

exports.getUser = (req, res, next) => {
    if(!req.body.userid) {
        res.status(404).json({message: 'id utilisateur manquant !'});
    }

    models.User.findOne({
        attributes: ['id', 'username', 'email'],
        where: {id: req.body.userid}
    })
    .then(user => {
        if(user) {
            res.status(201).json({user});
        } else {
            res.status(404).json({message: 'utilisateur non trouvé !'});
        }
    })
    .catch(error => req.status(500).json({message: 'impossible de rechercher cet utilisateur'}));
};

/*
model user
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
 */

