let { Book, validate } = require('../models/book');
// const { Chapter } = require('../models/chapter');
// const { Question } = require('../models/question');
// const { Quiz } = require('../models/quiz');
// let { User } = require('../models/user');

exports.getBooks = async (req, res) => {
    console.log(req.body)
    try {
        const book = await Book.find({ isActive: true }).sort({ _id: -1 }).limit(50);//Get 10 latest documents
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


exports.search = async (req, res) => {

    if (req.body.searchTerm.trim() == '') {
        next();
        return;
    }

    // var toSearch = req.body.searchTerm.split(" ").map(function (n) {
    //     return {
    //         searchTerm: new RegExp(n.trim())
    //     };
    // });

    const books = await Book.find({
        isActive: true,
        "$or": [{ "title": { $regex: req.body.searchTerm, "$options": "i" } }, { "tags": { $regex: req.body.searchTerm, "$options": "i" } }]
    });

    if (!books) return res.status(404).send('Not found.');

    try {
        res.send(books);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};