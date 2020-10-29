let { Quiz, validate } = require('../models/quiz');
let { Chapter } = require('../models/chapter');
let { Book } = require('../models/book');
const { Question } = require('../models/question');

exports.get = async (req, res) => {


   try {
      const quiz = await Quiz.find({ "book._id": req.params.bookid, isActive: true });
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
}

exports.getById = async (req, res) => {
   try {
      const quiz = await Quiz.findById(req.params.id).where({ isActive: true });
      if (!quiz) return res.status(404).send('The Quiz with the given ID was not found.');
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
}

exports.getByChapterId = async (req, res) => {
   try {
      console.log(req.body.params)
      const quiz = await Quiz.find({ 'chapter._id': req.params.id, isActive: true });
      if (!quiz) return res.status(404).send('The Chapter with the given ID was not found.');
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
}

