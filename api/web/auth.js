const express = require('express');
const router = express.Router();

const authCtrl = require('../../controllers/authCtrl');

router.post('/', authCtrl.login)
router.post('/forgotpassword', authCtrl.forgotPassword)
router.post('/reset-password', authCtrl.resetPassword)


module.exports = router;