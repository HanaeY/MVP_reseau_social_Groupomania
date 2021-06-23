// imports
const models = require('../models');

//fonctions 
exports.addComment = (req, res, next) => {
    if(!req.body.userid || !req.body.comment) {
        return res.status(401).json({message: 'paramètre manquant !'});
    }
    const articleid = parseInt(req.params.id);
    console.log('articleid: ', articleid);
    models.Article.findOne({
        where: {id: articleid},
        attributes: ['id']
    })
    .then(article => {
        article.update({comments: comments + 1})
        .then(() => {
            models.Comment.create({
                UserId: req.body.userid,
                ArticleId: article.id,
                comment: req.body.comment
            })
            .then(comment => res.status(201).json({comment}))
            .catch(() => res.status(500).json({message: "impossible d'enregistrer le commentaire !"}))
        })
        .catch(() => res.status(500).json({message: "impossible de mettre l'article à jour !"}))
    })
    .catch(() => res.status(500).json({message: "impossible de vérifier l'article !"}));
};