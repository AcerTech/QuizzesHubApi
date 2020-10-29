let { Book, validate } = require('../models/book');
// const { Chapter } = require('../models/chapter');
// const { Question } = require('../models/question');
// const { Quiz } = require('../models/quiz');
// let { User } = require('../models/user');

exports.getBooks = async (req, res) => {
    console.log(req.body)
    try {
        const book = await Book.find({ isActive: true });
        res.send(book);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).where({ isActive: true });
        if (!book) return res.status(404).send('The Book with the given ID was not found.');
        res.send(book);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}
