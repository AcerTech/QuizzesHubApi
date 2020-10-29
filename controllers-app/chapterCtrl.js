const { Chapter, validate } = require('../models/chapter');
const { Book } = require('../models/book');
const { Quiz } = require('../models/quiz');
const { Question } = require('../models/question');


exports.get = async (req, res) => {
    try {
        const chapter = await Chapter.find({ "book._id": req.params.id, isActive: true });
        res.status(200).send(chapter);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const chapter = await Chapter
            .findById(req.params.id).where({ isActive: true });
        if (!chapter) return res.status(404).send('The Chapter with the given ID was not found.');

        res.send(chapter);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}



