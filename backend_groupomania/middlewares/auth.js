// imports
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // pour ne pas prendre 'bearer"
        const decodedToken = jwt.verify(token, 'superclesecrete'); // verify vérifie le token, s'il n'est pas valide retourne une erreur
        const userid = decodedToken.userid; 

        if (req.body.userid) {
            const idToCompare = parseInt(req.body.userid);
            if(idToCompare !== userid) {
                res.status(401).json({message: 'requête non authentifiée !'});
            } else {
                next();
            }
        } else {
            next();
        }
    } catch(error) {
        res.status(500).json({error: error | 'requête non authentifiée !'});
    }
};

/*

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // pour ne pas prendre 'bearer"
        const decodedToken = jwt.verify(token, 'superclesecrete'); // verify vérifie le token, s'il n'est pas valide retourne une erreur
        const userid = decodedToken.userid; 

        console.log('decoded userid', userid);
        console.log('decoded userid', typeof(userid));
        console.log('req userid', req.body.userid);
        console.log('req userid', typeof(req.body.userid));

        if (req.body.userid && userid !== req.body.userid) {
            console.log('problème ici');
            throw 'user id non valide !';
        } else {
            next();
        }
    } catch(error) {
        res.status(401).json({error: error | 'requête non authentifiée !'});
    }
};

*/