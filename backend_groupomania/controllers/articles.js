// imports
const models = require('../models');

exports.postArticle = (req, res, next) => {
    const newArticle = models.Article.create({
        // ajouter pièce jointe 
        UserId: req.body.userid,
        description: req.body.article_description
    })
    .then(newArticle => res.status(201).json({newArticle}))
    //.catch(() => res.status(500).json({message: "impossible de publier l'article"}));
    .catch((error) => res.status(500).json({error}));
};

exports.getAllArticles = (req, res, next) => {
    //
};

