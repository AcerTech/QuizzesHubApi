const express = require('express');
const router = express.Router();

const chapterCtrl = require('../../controllers-web/chapterCtrl');
const admin = require('../../middleware/admin');

router.get('/bookChapters/:id', chapterCtrl.get)
router.get('/:id', chapterCtrl.getById)
router.get('/bysubjectId/:id', chapterCtrl.getBySubjectId)
router.post('/', chapterCtrl.add)
router.delete('/:id' ,chapterCtrl.delete)
router.put('/:id',chapterCtrl.update)


module.exports = router;