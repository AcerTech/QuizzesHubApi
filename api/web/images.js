const express = require('express');
const router = express.Router();

const imageCtrl = require('../../controllers-web/imageCtrl');
const admin = require('../../middleware/admin');

router.get('/:userId', imageCtrl.get)
router.get('/:id', imageCtrl.getById)
router.post('/', imageCtrl.add)
router.post('/searchbytags', imageCtrl.searchByTags)
router.put('/:id',imageCtrl.update)
router.delete('/:id' ,imageCtrl.delete)
router.post('/deleteByUrl' ,imageCtrl.deleteByUrl)

module.exports = router;