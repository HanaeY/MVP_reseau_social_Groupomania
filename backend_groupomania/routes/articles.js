// imports
const express = require('express');
const router = express.Router();

// middlewares
const authentification = require('../middlewares/auth');
const ctrl = require('../controllers/articles');

// routes /api/articles...
router.post('/', authentification, ctrl.postArticle);
router.get('/', ctrl.getAllArticles);

// export du routeur qui sera importé dans app
module.exports = router;