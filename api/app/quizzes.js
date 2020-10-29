const express = require('express');
const router = express.Router();

const quizCtrl = require('../../controllers-app/quizCtrl');

router.get('/:bookId', quizCtrl.get)
router.get('/:id', quizCtrl.getById)
router.get('/bychapterid/:id', quizCtrl.getByChapterId)

module.exports = router;