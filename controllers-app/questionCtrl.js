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
        const question = await Question.find({ isActive: ture })
        // .populate('questionType', 'name -_id')
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {

    try {
        const question = await Question.findById(req.params.id).where({ isActive: true });
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
            .find({ quiz: req.params.id, isActive: ture })
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
            .find({ 'book._id': req.params.id, isActive: true })
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
            .find({ 'chapter._id': req.params.id, isActive: ture })
        // .populate('subject', 'name -_id')
        // .populate('quiz', 'name -_id')
        res.send(question);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}
