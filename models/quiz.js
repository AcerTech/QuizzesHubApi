const mongoose = require('mongoose');
const Joi = require('joi');

const quizSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 50 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: String, default: '000'},
    chapter: ////Empeded doc
    {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            }
        })
    },
    book: ////Empeded doc
    {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            }
        })
    }

    // chapter: //Refrence doc
    //{type: mongoose.Schema.Types.ObjectId,
    // ref: 'Chapter',
    // required: true}
});

function validateQuiz(quiz) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        description: Joi.string().max(255),
        isActive: Joi.boolean(),
        displayOrder: Joi.string(),
        bookId: Joi.objectId().required(),
        chapterId: Joi.objectId().required()
    });
    return schema.validate(quiz);
}

exports.validate = validateQuiz
exports.quizSchema = quizSchema
module.exports.Quiz = mongoose.model('Quiz', quizSchema);