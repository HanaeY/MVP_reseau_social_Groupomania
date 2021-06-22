// imports
const models = require('../models');

exports.postArticle = (req, res, next) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;

    models.User.findOne({ 
        where: {id: req.body.userid},
        attributes: ['id']
    })
    .then(user => {
        models.Article.create({ // on créé un nouvel article qu'on enregistre dans la base de données
            UserId: user.id,
            description: req.body.description,
            file: fileUrl
        })
        .then(newArticle => res.status(201).json({newArticle}))
        .catch(() => res.status(500).json({message: "impossible de publier l'article"}));
    })
    .catch(() => res.status(404).json({message: 'utilisateur non trouvé !'}));
};

exports.getAllArticles = (req, res, next) => {
    models.Article.findAll()
    .then(articles => res.status(201).json({articles}))
    .catch(error => res.status(500).json({message: error | "impossible d'afficher les articles !"}))
};

