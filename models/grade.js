const mongoose = require('mongoose');
const Joi = require('joi');
const e = require('express');

const gradeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        // index: { unique: true, dropDups: true }
    },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
});

function validateGrade(grade) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        description: Joi.string().allow(null, '').max(255),
        isActive: Joi.boolean(),
        displayOrder: Joi.number()

    });
    return schema.validate(grade);
}

exports.gradeSchema = gradeSchema;//we may need to exports the schema because may some other models need it.
exports.Grade = mongoose.model('Grade', gradeSchema);//the gradeCtrl will need the model and validate method.
exports.validate = validateGrade;