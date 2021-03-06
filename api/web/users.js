const express = require('express');
const router = express.Router();

const usersCtrl = require('../../controllers-web/usersCtrl');
const auth = require('../../middleware/auth');

router.get('/me',auth , usersCtrl.get)
router.post('/', usersCtrl.register)
router.post('/confirm', usersCtrl.confirm)
router.post('/reconfirm', usersCtrl.resendConfirmationEmail)
router.post('/update-user-info/:id', usersCtrl.updateUserInfo)



module.exports = router;