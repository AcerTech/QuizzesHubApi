const express = require('express');
const router = express.Router();

const bookCtrl = require('../../controllers/bookCtrl');
const admin = require('../../middleware/admin');

router.get('/mybooks/:id', bookCtrl.getUserBooks)
router.get('/:id', bookCtrl.getById)
router.post('/', bookCtrl.add)
router.delete('/:id', bookCtrl.delete)
router.put('/:id', bookCtrl.update)


module.exports = router;