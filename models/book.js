const mongoose = require('mongoose');
const Joi = require('joi');


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
        // index: { unique: true, dropDups: true }
    },
    tags: { type: String, default: '' },
    imgUrl: { type: String, default: null, max: 255 },
    description: { type: String, default: '' },
    isActive: { type: Boolean, default: false },
    user: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            imgUrl: { type: String }
        })
    },
    // grade: {
    //     type: new mongoose.Schema({
    //         name: {
    //             type: String,
    //             required: true
    //         }
    //     })
    // },
    // subject: {
    //     type: new mongoose.Schema({
    //         name: {
    //             type: String,
    //             required: true
    //         }
    //     })
    // },
});

function validateBook(book) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        imgUrl: Joi.string().allow(null, ''),
        tags: Joi.string().allow(null, ''),
        description: Joi.string().allow(null, '').max(255),
        isActive: Joi.boolean(),
        userId: Joi.objectId().required(),
        // gradeId: Joi.objectId().required(),
        // subjectId: Joi.objectId().required(),

    });
    return schema.validate(book);
}

exports.bookSchema = bookSchema;//we may need to exports the schema because may some other models need it.
exports.Book = mongoose.model('Book', bookSchema);//the bookCtrl will need the model and validate method.
exports.validate = validateBook;