const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

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

exports.getUser = (req, res, next) => {
    if(!req.body.userid) {
        res.status(404).json({error: 'id utilisateur manquant !'});
    }

    models.User.findOne({
        attributes: ['id', 'username', 'email'],
        where: {id: req.body.userid}
    })
    .then(user => {
        if(user) {
            res.status(201).json({user});
        } else {
            res.status(404).json({error: 'utilisateur non trouvé !'});
        }
    })
    .catch(error => req.status(500).json({error: 'impossible de rechercher cet utilisateur !'}));
};

exports.deleteAccount = (req, res, next) => {
    models.User.findOne({
        where: {id: req.body.userid}
    })
    .then(user => {
        if(!user) {
            return res.statut(404).json({error: 'utilisateur non trouvé !'});
        }
        user.destroy()
        .then(() => {
            //res.redirect('/');
            res.status(201).json({message: 'compte utilisateur supprimé'});
        })
        .catch(() => res.status(500).json({error: 'impossible de supprimer le compte utilisateur !'}))
    })
    .catch(() => res.status(500).json({error: 'impossible de rechercher cet utilisateur !'}));
};

/*
model user
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
 */

