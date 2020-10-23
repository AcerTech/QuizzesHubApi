const mongoose = require('mongoose');

const Joi = require('joi');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true, max: 50 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },
    grade: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            }
        })
    }
    // grade: {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Grade',
    //     required: true
    // }
});

//Usually use Joi to validate user entry
function validateSubject(subject) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().max(255),
        displayOrder: Joi.number(),
        gradeId: Joi.objectId().required() 
    });
    return schema.validate(subject);
}

exports.validate = validateSubject
exports.subjectSchema = subjectSchema
exports.Subject = mongoose.model('Subject', subjectSchema)