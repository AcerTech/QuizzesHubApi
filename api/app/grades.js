const express = require('express');
const router = express.Router();

const gradeCtrl = require('../../controllers/gradeCtrl');
const admin = require('../../middleware/admin');

router.get('/', gradeCtrl.get)
router.get('/:id', gradeCtrl.getById)
router.post('/', gradeCtrl.add)
router.put('/:id', gradeCtrl.update)
router.delete('/:id' ,gradeCtrl.delete)

module.exports = router;