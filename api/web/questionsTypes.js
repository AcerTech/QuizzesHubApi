const express = require('express');
const router = express.Router();

const questionTypeCtrl = require('../../controllers/questionTypeCtrl');
const admin = require('../../middleware/admin');

router.get('/', questionTypeCtrl.get)
router.get('/:id', questionTypeCtrl.getById)
router.post('/', questionTypeCtrl.add)
router.put('/:id', questionTypeCtrl.update)
router.delete('/:id' ,questionTypeCtrl.delete)

module.exports = router;