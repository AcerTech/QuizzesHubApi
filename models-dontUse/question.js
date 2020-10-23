const mongoose = require('mongoose');
const Joi = require('joi');
const { answerSchema, Answer } = require('./answer');


const questionSchema = new mongoose.Schema({

    questionText: { type: String, required: true },
    timer: { type: Number, default: 0 },
    imgUrl: { type: String, default: null, max: 255 },
    displayOrder: { type: Number, default: 0, max: 255 },
    columnsCount: { type: Number, default: 0, max: 255 },
    isActive: { type: Boolean, default: true },
    questionType: {
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
        questionText: Joi.string().min(3).max(255).required(),
        imgUrl: Joi.string().allow(null, ''),
        timer: Joi.number().default(0),
        displayOrder: Joi.number(),
        isActive: Joi.boolean(),
        columnsCount: Joi.number().default(0),
        questionTypeId: Joi.objectId().required(),
        answers: Joi.array(),
        
    });
    return schema.validate(question);
}

exports.validate = validateQuestion
exports.questionSchema = questionSchema
exports.Question = mongoose.model('Question', questionSchema)