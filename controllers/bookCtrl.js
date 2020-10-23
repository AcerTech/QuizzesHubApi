let { Book, validate } = require('../models/book');
let { User } = require('../models/user');

exports.getUserBooks = async (req, res) => {
    try {
        // console.log(req.params.id)
        const book = await Book.find({ 'user._id': req.params.id });
        res.send(book);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('The Book with the given ID was not found.');
        res.send(book);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}

exports.add = async (req, res) => {
    // console.log(req.body)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId)
    if (!user) return res.status(404).send('The user with the given ID was not found.');


    let book = new Book({
        title: req.body.title,
        tags: req.body.tags,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        isActive: req.body.isActive,
        user: {
            _id: user._id,
            name: user.name
        }
    });

    try {
        book = await book.save();
        res.send(book);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let book = await Book.findById(req.params.id)
    if (!book) return res.status(404).send('The Book with the given ID was not found.');


    if (req.body._id) {
        delete req.body._id
    }

    // book = {
    //     title: req.body.title,
    //     tags: req.body.tags,
    //     imgUrl: req.body.imgUrl,
    //     description: req.body.description,
    //     isActive: req.body.isActive,
    // };


    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value
    })

    try {
        book = await book.save();
        res.status(200).send(book);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.delete = async (req, res) => {


    try {
        const book = await Book.findByIdAndRemove(req.params.id);
        if (!book) return res.status(404).send('The Book with the given ID was not found.');
        res.send(book);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};
