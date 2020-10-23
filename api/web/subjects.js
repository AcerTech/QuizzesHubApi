const express = require('express');
const router = express.Router();

const subjectCtrl = require('../../controllers/subjectCtrl');
const admin = require('../../middleware/admin');

router.get('/', subjectCtrl.get)
router.get('/:id', subjectCtrl.getById)
router.get('/bygradeid/:id', subjectCtrl.getByGradeId)
router.post('/', subjectCtrl.add)
router.delete('/:id',subjectCtrl.delete)
router.put('/:id', subjectCtrl.update)


module.exports = router;