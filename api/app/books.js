const express = require('express');
const router = express.Router();

const bookCtrl = require('../../controllers-app/bookCtrl');
const admin = require('../../middleware/admin');

router.get('/', bookCtrl.getBooks)
router.get('/:id', bookCtrl.getById)
router.post('/search', bookCtrl.search)
// router.delete('/:id', bookCtrl.delete)
// router.put('/:id', bookCtrl.update)


module.exports = router;