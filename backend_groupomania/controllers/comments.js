// imports
const models = require('../models');

//fonctions 
exports.addComment = (req, res, next) => {
    models.Article.findOne({
        where: {id: req.params.id},
        attributes: ['id']
    })
    .then(article => {
        models.Comment.create({
            UserId: req.body.userid,
            ArticleId: article.id,
            comment: req.body.comment
        })
        .then(comment => res.status(201).json({comment}))
        .catch(() => res.status(500).json({message: "impossible d'enregistrer le commentaire !"}))
    })
    .catch(() => {
        res.status(500).json({message: "impossible de retrouver l'article !"})});
};

exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({
        where: {id: req.params.commentid}
    })
    .then(comment => {
        comment.destroy()
        .then(() => res.status(201).json({message: "commentaire supprimé !"}))
        .catch(() => res.status(401).json({message: "impossible de supprimer le commentaire !"}))
    })
    .catch(() => res.status(500).json({message: "impossible de rechercher le commentaire !"}));
};

exports.getComments = (req, res, next) => {
    models.Comment.findAndCountAll({
        where: {ArticleId: req.params.id}
    })
    .then((count, rows) => {
        if(count == 0) {
            return res.status(401).json({error: 'pas de commentaires à afficher !'})
        }
        res.status(201).json({count, rows});
    })
    .catch(() => res.status(500).json({error: 'impossible de rechercher les commentaires !'}));
};
