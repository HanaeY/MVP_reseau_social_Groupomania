// imports
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // pour ne pas prendre 'bearer"
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY); // verify vérifie le token, s'il n'est pas valide retourne une erreur
        const userid = decodedToken.userid; 

        if (req.body.userid) {
            const idToCompare = parseInt(req.body.userid);
            if(idToCompare !== userid) {
                res.status(401).json({error: 'requête non authentifiée'});
            } else {
                console.log('req authentifiée !');
                next();
            }
        } else {
            next();
        }
    } catch(e) {
        res.status(500).json({error: "impossible d'authentifier la requête, veuiller réessayer plus tard"});
    }
};
