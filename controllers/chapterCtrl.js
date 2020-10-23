const { Chapter, validate } = require('../models/chapter');
const { Book } = require('../models/book');
const { Quiz } = require('../models/quiz');
const { Question } = require('../models/question');


exports.get = async (req, res) => {
    console.log(req.params.id)
    try {
        const chapter = await Chapter.find({ "book._id": req.params.id });
        // console.log(chapter)
        res.status(200).send(chapter);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const chapter = await Chapter
            .findById(req.params.id);
        if (!chapter) return res.status(404).send('The Chapter with the given ID was not found.');

        res.send(chapter);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getBySubjectId = async (req, res) => {
    try {
        const chapter = await Chapter.find({ 'subject._id': req.params.id });
        if (!chapter) return res.status(404).send('The Chpter with the given ID was not found.');
        res.send(chapter);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.add = async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findById(req.body.bookId);//we should get it with the body
    if (!book) return res.status(400).send('Invalid book Id.');


    let chapter = new Chapter({
        name: req.body.name,
        isActive: req.body.isActive,
        description: req.body.description,
        displayOrder: req.body.displayOrder,
        book: {
            _id: book._id,
            title: book.title
        }
    });

    try {
        chapter = await chapter.save();
        res.send(chapter);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const book = await Book.findById(req.body.bookId);//we should get it with the body
    if (!book) return res.status(400).send('Invalid book Id.');

    let chapter = await Chapter.findById(req.params.id)
    if (!chapter) return res.status(404).send('The chapter with the given ID was not found.');

    if (req.body._id) {
        delete req.body._id
    }

    // //p : property
    // Object.entries(req.body).forEach((p) => {
    //     console.log(p)
    //     const key = p[0];
    //     const value = p[1];
    //     chapter[key] = value
    // })
    chapter = {
        name: req.body.name,
        isActive: req.body.isActive,
        description: req.body.description,
        displayOrder: req.body.displayOrder,
        book: {
            _id: book._id,
            title: book.title
        }
    };


    try {
        chapter = await Chapter.update({ _id: req.params.id }, chapter, function (err, raw) {
            if (err) {
                res.send(err);
            }
            return res.status(204).send('The Chapter been updated');
        })
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};


exports.delete = async (req, res) => {
    try {

        const chapter = await Chapter.findByIdAndRemove(req.params.id);
        if (!chapter) return res.status(404).send('The Chapter with the given ID was not found.');
        const quiz = await Quiz.deleteMany({ 'chapter._id': req.params.id });
        const question = await Question.deleteMany({ 'chapter._id': req.params.id });
        
        res.send(chapter);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

// function vlaidateSubject(subject) {
//     const schema = {
//         name: Joi.string().min(3).required(),
//         description: Joi.string().max(100)
//     }
//     return Joi.validate(subject, schema);
// }



