// imports
const express = require('express');
const router = express.Router();

// middlewares
const authentification = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const ctrl = require('../controllers/articles');

// routes /api/articles...
router.post('/', authentification, multer, ctrl.postArticle);
router.get('/', authentification, ctrl.getAllArticles);
router.delete('/:id', authentification, ctrl.deleteArticle);

// export du routeur qui sera importé dans app
module.exports = router;