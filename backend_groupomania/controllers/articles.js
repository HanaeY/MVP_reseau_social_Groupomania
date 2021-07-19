// imports
const models = require('../models');
const fs = require('fs');

// fonctions
exports.postArticle = (req, res, next) => {
    const reqBody = JSON.parse(req.body.textContent);
    const fileUrl = `${req.protocol}://${req.get('host')}/files/${req.file.filename}`;

    models.User.findOne({ 
        where: {id: reqBody.userid},
        attributes: ['id']
    })
    .then(user => {
        if(!user) {
            return res.status(404).json({error: "utilisateur non trouvé"});
        }
        models.Article.create({ 
            UserId: user.id,
            description: reqBody.description,
            file: fileUrl,
            alternativeText: reqBody.alternativeText
        })
        .then(() => res.status(201).json({message: "article bien créé"}))
        .catch(() => fs.unlink(`./files/${req.file.filename}`, () => res.status(500).json({error: "impossible de publier l'article, veuillez réessayer ultérieurement"})));
    })
    .catch(() => fs.unlink(`./files/${req.file.filename}`, () => res.status(500).json({error: "impossible de rechercher l'utilisateur, veuillez réessayer ultérieurement"})));
};

exports.getAllArticles = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;
    models.Article.findAll({
        include: [
            {
                model: models.User, 
                attributes: ['username']
            },
            {
                model: models.Comment, 
                attributes: ['comment', 'id', 'createdAt', 'UserId'],
                include: [{model: models.User, attributes: ["username"]}],
            }
        ],
        order: [['createdAt', order]],
        limit: (!isNaN(limit) ? limit : null),
        offset: (!isNaN(offset) ? offset : null)
    })
    .then(articles => {
        res.status(200).json({articles});
    })
    .catch(() => res.status(500).json({error: "impossible d'afficher les articles, veuillez réessayer ultérieurement"}))
};

exports.deleteArticle = (req, res, next) => {
    models.Article.findOne({
        where: {id: req.params.id}
    })
    .then(article => {
        if(!article) {
            return res.status(404).json({error: 'article introuvable'});
        } else {
            // suppression du fichier joint
            const filename = article.file.split('/files/')[1];
            fs.unlink(`./files/${filename}`, () => { 
                article.destroy()
                .then(() => {
                    res.status(200).json({message: "article bien supprimé"});
                })
                .catch(() => res.status(500).json({error: "impossible de supprimer l'article, veuillez réessayer ultérieurement"}));
            })
        }
    })
    .catch(() => res.status(500).json({error: "impossible de rechercher l'article, veuillez réessayer ultérieurement"}))
};

