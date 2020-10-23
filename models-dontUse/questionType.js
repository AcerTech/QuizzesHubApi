const mongoose = require('mongoose');
const Joi = require('joi');

const questionTypeSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 50 },
    isActive: { type: Boolean, default: true },
    description: { type: String, default: '', max: 255 },
    displayOrder: { type: Number,default:0 }
});

function validateQuestionType(questionType) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255).allow(null,''),
        isActive: Joi.boolean(),
        displayOrder:Joi.number()
    });
    return schema.validate(questionType);
}

exports.validate = validateQuestionType
module.exports.questionTypeSchema = questionTypeSchema
exports.QuestionType = mongoose.model('QuestionType', questionTypeSchema)