// imports 
const express = require('express');
const router = express.Router();

// middleswares
const ctrl = require('../controllers/users'); 
const validate = require('../middlewares/usersValidation');

// détail des routes pour les req envoyées à /api/users/[extension]
router.post('/signup', validate.validateUsername, validate.validateEmail, validate.validatePassword, ctrl.signup);
router.post('/login', ctrl.login);

// export du routeur qui sera importé dans app
module.exports = router;