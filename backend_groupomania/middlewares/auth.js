// imports
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // pour ne pas prendre 'bearer"
        console.log('test2', token);
        const decodedToken = jwt.verify(token, 'superclesecrete'); // verify vérifie le token, s'il n'est pas valide retourne une erreur
        const userid = decodedToken.userid; 

        if (req.body.userid && userid !== req.body.userid) {
            throw 'user id non valide !';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: error | 'requête non authentifiée !'});
    }
};