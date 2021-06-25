// imports
const models = require('../models');

//fonctions 
exports.addComment = (req, res, next) => {
    if(!req.body.userid || !req.body.comment) {
        return res.status(401).json({message: 'paramètre manquant !'});
    }
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
    console.log('REQ.PARAMS.COMMENTID', req.params.commentid);

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
