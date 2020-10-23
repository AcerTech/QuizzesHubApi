const mongoose = require('mongoose');
const Joi = require('joi');
const e = require('express');

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tags: { type: String, required: true },
    imgUrl: { type: String, default: '' },
    userId: { type: String, required: true }
});

imageSchema.index({ 'tagsIndex': 'text' });//https://stackoverflow.com/questions/28775051/best-way-to-perform-a-full-text-search-in-mongodb-and-mongoose

function validateImage(image) {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        tags: Joi.string().max(255).required(),
        imgUrl: Joi.string().max(255).required(),
        userId: Joi.objectId().required()
    });
    return schema.validate(image);
}

exports.imageSchema = imageSchema;//we may need to exports the schema because may some other models need it.
exports.Image = mongoose.model('Image', imageSchema);//the imageCtrl will need the model and validate method.
exports.validate = validateImage;