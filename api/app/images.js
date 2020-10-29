const express = require('express');
const router = express.Router();

const imageCtrl = require('../../controllers-app/imageCtrl');
const admin = require('../../middleware/admin');

router.get('/:userId', imageCtrl.get)
router.get('/:id', imageCtrl.getById)


module.exports = router;