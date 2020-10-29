const { Question, validate } = require('../models/question');
const { QuestionType } = require('../models/questionType');
const { Quiz } = require('../models/quiz');
const { Subject } = require('../models/subject');
const { Chapter } = require('../models/chapter');
const { Book } = require('../models/book');
// const { answerSchema, Answer } = require('../models/answer');
const { Grade } = require('../models/grade')
// const { Subject } = require('../model/subject')


exports.get = async (req, res) => {

    try {
        const question = await Question
            .find()
        // .populate('questionType', 'name -_id')
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {

    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).send('The Question with the given ID was not found.');
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getQuestionsByQuizId = async (req, res) => {
    // const grade = await Grade.findById(req.body.gradeId);//we should get it with the body
    // if (!grade) return res.status(400).send('Invalid Grade.');

    // const quiz = await Quiz.findById(req.body.quizId);//we should get it with the body
    // if (!quiz) return res.status(400).send('Invalid Quiz.');

    // const subject = await Subject.findById(req.body.subjectId);//we should get it with the body
    // if (!subject) return res.status(400).send('Invalid subject.');


    try {
        const question = await Question
            .find({ quiz: req.params.id })
        // .populate('questionType', 'name -_id')
        // .populate('quiz', 'name -_id')
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}

exports.getQuestionsByBookId = async (req, res) => {

    try {
        const question = await Question
            .find({ 'book._id': req.params.id })
        // .populate('subject', 'name -_id')
        // .populate('quiz', 'name -_id')
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}

exports.getQuestionsByChapterId = async (req, res) => {

    try {
        const question = await Question
            .find({ 'chapter._id': req.params.id })
        // .populate('subject', 'name -_id')
        // .populate('quiz', 'name -_id')
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}

exports.add = async (req, res) => {

    // console.log(req.body)

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);


    const quiz = await Quiz.findById(req.body.quizId);//we should get it with the body
    if (!quiz) return res.status(400).send('Invalid Quiz.');
    console.log(quiz)
    const book = await Book.findById(req.body.bookId);//we should get it with the body
    if (!book) return res.status(400).send('Invalid book.');
    // console.log(book)
    const chapter = await Chapter.findById(req.body.chapterId);//we should get it with the body
    if (!chapter) return res.status(400).send('Invalid Chapter.');
    // console.log(chapter)
    const questionType = await QuestionType.findById(req.body.questionTypeId);//we should get it with the body
    if (!questionType) return res.status(400).send('Invalid Question Type.');
    // console.log(questionType)

    let question = new Question({
        questionText: req.body.questionText,
        timer: req.body.timer,
        imgUrl: req.body.imgUrl,
        displayOrder: req.body.displayOrder,
        columnsCount: req.body.columnsCount,
        isActive: req.body.isActive,
        answers: req.body.answers,
        book: {
            _id: book._id,
            title: book.title
        },
        quiz: {
            _id: quiz._id,
            name: quiz.name
        },
        chapter: {
            _id: chapter._id,
            name: chapter.name
        },
        questionType: {
            _id: questionType._id,
            name: questionType.name
        }
    });

    console.log(question)
    try {
        question = await question.save();
        await res.send(question);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
        return res.status(400).send(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {

    console.log(req.body)
    if (req.body._id) {
        delete req.body._id
    }

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let question = await Question.findById(req.params.id)
    if (!question) return res.status(404).send('The Question with the given ID was not found.');
    // console.log('Found a question : ' + question)


    const quiz = await Quiz.findById(req.body.quizId);//we should get it with the body
    if (!quiz) return res.status(400).send('Invalid Quiz.');

    const book = await Book.findById(req.body.bookId);//we should get it with the body
    if (!book) return res.status(400).send('Invalid book.');

    const chapter = await Chapter.findById(req.body.chapterId);//we should get it with the body
    if (!chapter) return res.status(400).send('Invalid Chapter.');

    const questionType = await QuestionType.findById(req.body.questionTypeId);//we should get it with the body
    if (!questionType) return res.status(400).send('Invalid Question Type.');





    //     Object.entries(req.body).forEach((item) => {
    //     const key = item[0];
    //     const value = item[1];
    //     question[key] = value
    // })
    // console.log(question)



    question = {
        questionText: req.body.questionText,
        timer: req.body.timer,
        imgUrl: req.body.imgUrl,
        displayOrder: req.body.displayOrder,
        columnsCount: req.body.columnsCount,
        isActive: req.body.isActive,
        answers: req.body.answers,


        book: {
            _id: book._id,
            title: book.title
        },
        quiz: {
            _id: quiz._id,
            name: quiz.name
        },
        chapter: {
            _id: chapter._id,
            name: chapter.name
        },
        questionType: {
            _id: questionType._id,
            name: questionType.name
        }
    };
    // console.log(question)

    try {
        question = await Question.update({ _id: req.params.id }, question, function (err, raw) {
            if (err) {
                res.send(err);
            }
            return res.status(204).send('The Question been updated');
        });
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.delete = async (req, res) => {
    try {
        // console.log(req.body)
        const question = await Question.findByIdAndRemove(req.params.id);
        if (!question) return res.status(404).send('The Question with the given ID was not found.');
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};
