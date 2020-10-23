const mongoose = require('mongoose');
const { string, required } = require('joi');
const Joi = require('joi');

const answerSchema = new mongoose.Schema({
    answerText: { type: String, max: 255 },
    isCorrect: { type: Boolean, default: false },
    imgUrl: { type: String, default: null, max: 255 },
    displayOrder: { type: Number, min: 0, max: 255 }
    // question: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Question',
    //     required: true
    // }

});

function validateAnswer(answer) {
    const schema = Joi.object({
        answerText: Joi.string().max(255).allow(null,''),
        imgUrl: Joi.string().max(255),
        isCorrect: Joi.boolean(),
        displayOrder: Joi.number()
        // questionId: Joi.objectId().required()
    });
    return schema.validate(answer);
}
exports.validate = validateAnswer
module.exports.answerSchema = answerSchema
exports.Answer = mongoose.model('Answer', answerSchema)