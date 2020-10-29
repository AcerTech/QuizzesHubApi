let { Quiz, validate } = require('../models/quiz');
let { Chapter } = require('../models/chapter');
let { Book} = require('../models/book');
const { Question } = require('../models/question');

exports.get = async (req, res) => {


   try {
      const quiz = await Quiz.find({"book._id":req.params.bookid});
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
}

exports.getById = async (req, res) => {
   try {
      const quiz = await Quiz.findById(req.params.id);
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
      const quiz = await Quiz.find({ 'chapter._id': req.params.id });
      if (!quiz) return res.status(404).send('The Chapter with the given ID was not found.');
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
}


exports.add = async (req, res) => {
   console.log(req.body)
   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const book = await Book.findById(req.body.bookId)
   if (!book) return res.status(404).send('The book with the given ID was not found.');

   const chapter = await Chapter.findById(req.body.chapterId)
   if (!chapter) return res.status(404).send('The Chapter with the given ID was not found.');

   let quiz = new Quiz({
      name: req.body.name,
      isActive: req.body.isActive,
      description: req.body.description,
      displayOrder: req.body.displayOrder,
      chapter: {
         _id: chapter._id,
         name: chapter.name
      },
      book: {
         _id: book._id,
         title: book.title
      }
   });


   try {
      quiz = await quiz.save();
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
};

exports.update = async (req, res) => {

   const { error } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let quiz = await Quiz.findById(req.params.id)
   if (!quiz) return res.status(404).send('The Quiz with the given ID was not found.');

   const book = await Book.findById(req.body.bookId)
   if (!book) return res.status(404).send('The book with the given ID was not found.');

   const chapter = await Chapter.findById(req.body.chapterId)
   if (!chapter) return res.status(404).send('The Chapter with the given ID was not found.');

   if (req.body._id) {
      delete req.body._id
   }

   quiz = {
      name: req.body.name,
      isActive: req.body.isActive,
      description: req.body.description,
      displayOrder: req.body.displayOrder,
      chapter: {
         _id: chapter._id,
         name: chapter.name
      },
      book: {
         _id: book._id,
         title: book.title
      }
   };
   
   try {
      quiz = await Quiz.update({ _id: req.params.id }, quiz, function (err, raw) {
         if (err) {
            res.send(err);
         }
         return res.status(204).send('The Quiz been updated');
      })

   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
};

exports.delete = async (req, res) => {
   try {
      const quiz = await Quiz.findByIdAndRemove(req.params.id);
      if (!quiz) return res.status(404).send('The Quiz with the given ID was not found.');
      const question = await Question.deleteMany({'quiz._id':req.params.id});
     
      res.send(quiz);
   } catch (ex) {
      for (field in ex.errors)
         console.log(ex.errors[field].message)
   }
};