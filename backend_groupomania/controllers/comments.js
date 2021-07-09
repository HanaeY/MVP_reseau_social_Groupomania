// imports
const models = require('../models');

//fonctions 
exports.addComment = (req, res, next) => {
    models.Article.findOne({
        where: {id: req.params.id},
        attributes: ['id']
    })
    .then(article => {
        if(!article) {
            return res.status(404).json({error: "référence de l'article incorrecte"});
        }
        models.Comment.create({
            UserId: req.body.userid,
            ArticleId: article.id,
            comment: req.body.comment,
        })
        .then(() => res.status(201).json({message: "commentaire bien enregistré"}))
        .catch(() => res.status(500).json({error: "échec de l'enregistrement du commentaire, veuillez réessayer ultérieurement"}))
    })
    .catch(() => {res.status(500).json({error: "échec de l'enregistrement du commentaire, veuillez réessayer ultérieurement"})});
};

exports.deleteComment = (req, res, next) => {
    models.Comment.findOne({
        where: {id: req.params.commentid}
    })
    .then(comment => {
        if(!comment) {
            return res.status(404).json({error: "référence non trouvée"});
        }
        comment.destroy()
        .then(() => res.status(200).json({message: "commentaire supprimé"}))
        .catch(() => res.status(500).json({error: "échec de la suppression, veuillez réessayer ultérieurement"}))
    })
    .catch(() => res.status(500).json({error: "référence non trouvée, veuillez réessayer ultérieurement"}));
};
