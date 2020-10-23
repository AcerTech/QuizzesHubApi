const mongoose = require('mongoose');
const Joi = require('joi');
const { QuizSchema } = require("./quiz")

const chapterSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 255 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 },
    quizzes: [QuizSchema]
});

//Usually use Joi to validate user entry
function validateChapter(chapter) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        description: Joi.string().max(255),
        displayOrder: Joi.number(),
        isActive: Joi.boolean(),
        bookId: Joi.objectId().required(),
        quizzes: Joi.array()
    });
    return schema.validate(chapter);
}

exports.validate = validateChapter
exports.ChapterSchema = chapterSchema
exports.Chapter = mongoose.model('Chapter', chapterSchema)