const { Chapter, validate } = require('../models/chapter');
const { Book } = require('../models/book');

exports.get = async (req, res) => {
    console.log(req.params.id)
    try {
        const chapter = await Book.findById(req.params.id );
        console.log(chapter.chapters)
        res.status(200).send(chapter.chapters);
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
    });
    book.chapters.push(chapter);

    try {
        book = await book.save();
        res.send(chapter);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const subject = await Subject.findById(req.params.id)
    if (!subject) return res.status(404).send('The Subject with the given ID was not found.');

    if (req.body._id) {
        delete req.body._id
    }

    //p : property
    Object.entries(req.body).forEach((p) => {
        const key = p[0];
        const value = p[1];
        subject[key] = value
    })

    try {
        chapter = await chapter.save();
        res.send(chapter);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};


exports.delete = async (req, res) => {
    try {
        const chapter = await Chapter.findByIdAndRemove(req.params.id);
        if (!chapter) return res.status(404).send('The Chapter with the given ID was not found.');
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



