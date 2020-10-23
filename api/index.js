const express = require('express');
const router = express.Router();

router.use('/web', require('./web'));
router.use('/app', require('./app'));

module.exports = router;