const mongoose = require('mongoose');
const Joi = require('joi');
const { questionSchema } = require("./question");

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 50 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    questions: [questionSchema]
});

function validateQuiz(quiz) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255),
        isActive: Joi.boolean(),
        displayOrder: Joi.number(),
        questions: Joi.array(),
        bookId: Joi.objectId().required(),
        chapterId: Joi.objectId().required(),
    });
    return schema.validate(quiz);
}

exports.validate = validateQuiz
module.exports.Quiz = mongoose.model('Quiz', quizSchema);
exports.QuizSchema = quizSchema