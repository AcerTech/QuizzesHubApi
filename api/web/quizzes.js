const express = require('express');
const router = express.Router();

const quizCtrl = require('../../controllers-web/quizCtrl');
const admin = require('../../middleware/admin');

router.get('/:bookId', quizCtrl.get)
router.get('/:id', quizCtrl.getById)
router.get('/bychapterid/:id', quizCtrl.getByChapterId)
router.post('/', quizCtrl.add)
router.put('/:id', quizCtrl.update)
router.delete('/:id' ,quizCtrl.delete)


module.exports = router;