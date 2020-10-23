const express = require('express');
const router = express.Router();

const answerCtrl = require('../../controllers/answerCtrl');

router.get('/', answerCtrl.get)
router.get('/:id', answerCtrl.getById)
router.post('/', answerCtrl.add)
router.put('/:id', answerCtrl.update)
router.delete('/:id', answerCtrl.delete)

module.exports = router;