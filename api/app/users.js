const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers/usersCtrl');
const auth = require('../../middleware/auth');

router.get('/me',auth , usersCtrl.get)
router.post('/', usersCtrl.register)


module.exports = router;