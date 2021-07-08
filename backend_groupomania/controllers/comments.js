// imports
const models = require('../models');

//fonctions 
exports.addComment = (req, res, next) => {
    // horodatage 
    const date = new Date();
    console.log('CE QUE DONNE NEW DATE(): ', date);
    const dateHere = date.setHours(date.getHours() + 2);

    models.Article.findOne({
        where: {id: req.params.id},
        attributes: ['id']
    })
    .then(article => {
        models.Comment.create({
            UserId: req.body.userid,
            ArticleId: article.id,
            comment: req.body.comment,
            createdAt: dateHere

            //createdAt: daytime
            //createdAt: new Date.UTC() >> erreur
            //createdAt: new Date() >> GMT
            //createdAt: Date.now() >> GMT (supposé donner un timestamp en ms)
            //createdAt: new Date.now() >> erreur
            //createdAt: new Date().toLocaleDateString() >> donne une mauvaise date et mauvaise heure 
            //createdAt: new Date().toLocaleTimeString() >> erreur 
            //createdAt: new Date().toLocaleString() >> erreur 
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
