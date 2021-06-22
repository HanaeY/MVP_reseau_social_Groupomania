// imports
const express = require('express');
const router = express.Router();

// middlewares
const authentification = require('../middlewares/auth');
const ctrl = require('../controllers/articles');
const multer = require('../middlewares/multer');

// routes /api/articles...
router.post('/', authentification, multer, ctrl.postArticle);
router.get('/', authentification, ctrl.getAllArticles);

// export du routeur qui sera importé dans app
module.exports = router;