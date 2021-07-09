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
            comment: req.body.comment,
        })
        .then(() => res.status(201).json({message: "commentaire bien enregistré"}))
        .catch(() => res.status(500).json({error: "échec de l'enregistrement du commentaire"}))
    })
    .catch(() => {
        res.status(500).json({error: "échec de l'enregistrement du commentaire, référence non trouvée"})});
};

exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({
        where: {id: req.params.commentid}
    })
    .then(comment => {
        comment.destroy()
        .then(() => res.status(201).json({message: "commentaire supprimé"}))
        .catch(() => res.status(401).json({message: "échec de la suppression"}))
    })
    .catch(() => res.status(500).json({message: "échec de la suppression, référence non trouvée"}));
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
    .catch(() => res.status(500).json({error: 'impossible de rechercher les commentaires'}));
};
