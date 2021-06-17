const express = require('express');
const router = express.Router();

// middleswares à importer ici 
const ctrl = require('../controllers/users'); // TO DO : changer clé secrète du token
// TO DO : ajouter middlewares de validation des inputs 

// détail des routes pour les req envoyées à /api/users/[extension]
router.post('/signup', ctrl.signup);
router.post('/login', ctrl.login);

// export du routeur qui sera importé dans app
module.exports = router;