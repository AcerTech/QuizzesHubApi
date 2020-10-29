const express = require('express');
const router = express.Router();

const questionCtrl = require('../../controllers-app/questionCtrl');
const admin = require('../../middleware/admin');

// router.get('/', questionCtrl.get)
router.get('/:id', questionCtrl.getById)
router.get('/byquizid/:id', questionCtrl.getQuestionsByQuizId)
router.get('/bybookid/:id', questionCtrl.getQuestionsByBookId)
router.get('/bychapterid/:id', questionCtrl.getQuestionsByChapterId)



module.exports = router;