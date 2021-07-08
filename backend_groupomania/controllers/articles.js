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
        models.Article.create({ // on créé un nouvel article qu'on enregistre dans la base de données
            UserId: user.id,
            description: reqBody.description,
            file: fileUrl,
            alternativeText: reqBody.alternativeText
        })
        .then(newArticle => res.status(201).json({newArticle}))
        .catch(() => fs.unlink(`./files/${req.file.filename}`, () => res.status(500).json({message: "impossible de publier l'article !"})));
    })
    .catch(() => fs.unlink(`./files/${req.file.filename}`, () => res.status(404).json({message: "utilisateur non trouvé !"})));
};

exports.getAllArticles = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;
    console.log(req.query);
    models.Article.findAll({
        include: [
            {
                model: models.User, 
                attributes: ['username']
            },
            {
                model: models.Comment, 
                attributes: ['comment', 'id', 'createdAt', 'UserId'],
                include: [{model: models.User, attributes: ["username"]}]
            }
        ],
        order: [['createdAt', order]],
        limit: (!isNaN(limit) ? limit : null),
        offset: (!isNaN(offset) ? offset : null)
    })
    .then(articles => {
        res.status(201).json({articles});
    })
    .catch(error => res.status(500).json({message: error | "impossible d'afficher les articles !"}))
};

exports.deleteArticle = (req, res, next) => {
    models.Article.findOne({
        where: {id: req.params.id}
    })
    .then(article => {
        if(!article) {
            res.status(404).json({message: 'article introuvable !'});
        } else {
            // suppression du fichier joint
            const filename = article.file.split('/files/')[1];
            fs.unlink(`./files/${filename}`, () => { // callback : suppression de l'article
                article.destroy()
                .then(() => {
                    //res.redirect('/');
                    res.status(201).json({message: 'article supprimé !'});
                })
                .catch(error => res.status(500).json({error}));
            })
        }
    })
    .catch(() => res.status(500).json({message: "impossible de rechercher l'article !"}))
};

