// imports 
const express = require('express');
const router = express.Router();

// middleswares
const ctrl = require('../controllers/users'); 
const validate = require('../middlewares/inputsValidation');
const authentification = require('../middlewares/auth');

// détail des routes pour les req envoyées à /api/users/[extension]
router.post('/signup', validate.validateUsername, validate.validateEmail, validate.validatePassword, ctrl.signup);
router.post('/login', ctrl.login);
router.delete('/myaccount', authentification, ctrl.deleteAccount);
router.put('/myaccount/updateUsername', authentification, validate.validateUsername, ctrl.updateUsername);
router.put('/myaccount/updateEmail', authentification, validate.validateEmail, ctrl.updateEmail);
router.put('/myaccount/updatePassword', authentification, validate.validatePassword, ctrl.updatePassword);

// export du routeur qui sera importé dans app
module.exports = router;