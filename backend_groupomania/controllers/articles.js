// imports
const models = require('../models');
const fs = require('fs');

// fonctions
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
            file: fileUrl,
            alternativeText: req.body.alternativeText
        })
        .then(newArticle => res.status(201).json({newArticle}))
        .catch(() => fs.unlink(`./files/${req.file.filename}`, () => res.status(500).json({message: "impossible de publier l'article !"})));
    })
    .catch(() => fs.unlink(`./files/${req.file.filename}`, () => res.status(404).json({message: "utilisateur non trouvé !"})));
};

exports.getAllArticles = (req, res, next) => {
    models.Article.findAll()
    .then(articles => res.status(201).json({articles}))
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

