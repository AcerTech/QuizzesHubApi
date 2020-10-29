const express = require('express');
const router = express.Router();

const questionTypeCtrl = require('../../controllers-app/questionTypeCtrl');
const admin = require('../../middleware/admin');

router.get('/', questionTypeCtrl.get)
router.get('/:id', questionTypeCtrl.getById)

module.exports = router;