// imports 
const express = require('express');
const router = express.Router();

// middleswares
const ctrl = require('../controllers/users'); 
const validate = require('../middlewares/usersValidation');
const authentification = require('../middlewares/auth');

// détail des routes pour les req envoyées à /api/users/[extension]
router.post('/signup', validate.validateUsername, validate.validateEmail, validate.validatePassword, ctrl.signup);
router.post('/login', ctrl.login);
router.get('/myaccount', authentification, ctrl.getUser);
router.delete('/myaccount', authentification, ctrl.deleteAccount);

// export du routeur qui sera importé dans app
module.exports = router;