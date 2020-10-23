const mongoose = require('mongoose');
const Joi = require('joi');
const { ChapterSchema } = require("./chapter");

// const subAnswers = {
//     answerText: { type: String, max: 255 },
//     isCorrect: { type: Boolean, default: false },
//     imgUrl: { type: String, default: null, max: 255 },
//     displayOrder: { type: Number, min: 0, max: 255 }
// }

// const subQustionType = {
//     name: { type: String, required: true, max: 50 },
//     isActive: { type: Boolean, default: true },
//     description: { type: String, default: '', max: 255 },
//     displayOrder: { type: Number, default: 0 }
// }


// const subQustions = {
//     questionText: { type: String, required: true },
//     timer: { type: Number, default: 0 },
//     imgUrl: { type: String, default: null, max: 255 },
//     displayOrder: { type: Number, default: 0, max: 255 },
//     columnsCount: { type: Number, default: 0, max: 255 },
//     isActive: { type: Boolean, default: true },
//     questionType: subQustionType,
//     answers: [subAnswers]
// }


// const subQuiz = {
//     name: { type: String, required: true, max: 50 },
//     description: { type: String, default: '' },
//     isActive: { type: Boolean, default: true },
//     displayOrder: { type: Number, default: 0 },
//     questions:[subQustions]
// }

// const subChapter = {
//     name: { type: String, required: true, max: 255 },
//     description: { type: String, default: '' },
//     isActive: { type: Boolean, default: false },
//     displayOrder: { type: Number, default: 0 },
//     quizzes:[subQuiz]
// }




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
            }
        })
    },
    chapters: [ChapterSchema]
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