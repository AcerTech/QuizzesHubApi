const mongoose = require('mongoose');
const Joi = require('joi');


const chapterSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 255 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: String, default: '000' },
    book: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            }
        })
    },
});

//Usually use Joi to validate user entry
function validateSubject(chapter) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(255).required(),
        description: Joi.string().max(255),
        displayOrder: Joi.string(),
        bookId: Joi.objectId().required(),
        isActive: Joi.boolean(),
    });
    return schema.validate(chapter);
}

exports.validate = validateSubject
exports.ChapterSchema = chapterSchema
exports.Chapter = mongoose.model('Chapter', chapterSchema)