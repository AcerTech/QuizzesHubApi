const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.use('/quizzes',  require('./quizzes'));
router.use('/questions',  require('./questions'));
router.use('/questionsTypes',  require('./questionsTypes'));
router.use('/answers',  require('./answers'));
router.use('/chapters',  require('./chapters'));
router.use('/images',  require('./images'));
router.use('/books',  require('./books'));
router.use('/users', require('./users'));
router.use('/auth', require('./auth'));

// router.use('/quizzes', auth, require('./quizzes'));
// router.use('/questions', auth, require('./questions'));
// router.use('/questionsTypes', auth, require('./questionsTypes'));
// router.use('/answers', auth, require('./answers'));
// router.use('/chapters', auth, require('./chapters'));
// router.use('/images', auth, require('./images'));
// router.use('/books', auth, require('./books'));
// router.use('/users', require('./users'));
// router.use('/auth', require('./auth'));

module.exports = router