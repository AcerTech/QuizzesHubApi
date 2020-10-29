const mongoose = require('mongoose');
const Joi = require('joi');
const { answerSchema, Answer } = require('./answer');


const questionSchema = new mongoose.Schema({

    questionText: { type: String, required: true },
    timer: { type: Number, default: 0 },
    imgUrl: { type: String, default: null, max: 255 },
    displayOrder: { type: String, default: '000', max: 255 },
    columnsCount: { type: Number, default: 0, max: 255 },
    isActive: { type: Boolean, default: true },
    book: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            }
        })
    },
    quiz: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            }
        })
    },
    questionType: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            }
        })
    },
    chapter: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            }
        })
    },
    answers: [answerSchema]
});

function validateQuestion(question) {
    const schema = Joi.object({
        // _id: Joi.string().allow(null, ''),
        questionText: Joi.string().min(3).max(255).required(),
        imgUrl: Joi.string().allow(null, ''),
        timer: Joi.number().default(0),
        displayOrder: Joi.string(),
        isActive: Joi.boolean(),
        columnsCount: Joi.number().default(0),

        answers: Joi.array(),
        questionTypeId: Joi.objectId().required(),
        bookId: Joi.objectId().required(),
        quizId: Joi.objectId().required(),
        chapterId: Joi.objectId().required()
    });
    return schema.validate(question);
}

exports.validate = validateQuestion
exports.questionSchema = questionSchema
exports.Question = mongoose.model('Question', questionSchema)