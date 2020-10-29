const { Image, validate } = require('../models/image');
const { User } = require('../models/user')


exports.get = async (req, res) => {
    try {
        const image = await Image.find({ userId: req.params.userId});
        res.send(image);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}


exports.searchByTags = async (req, res, next) => {

    if (req.body.tags.trim() == '') {
        next();
        return;
    }
    console.log(req.body)
    try {
        //{"$or": [ { "fullname" : { $regex: criteria }}, { "email" : { $regex: criteria }}, { "login" : { $regex: criteria }}]}
        const image = await Image.find({
            userId: req.body.userId
            , "$or": [{ "tags": { $regex: req.body.tags } }, { "name": { $regex: req.body.tags } }]
        });
        // const image = await Image.find({ tags: { $regex: '.*' + req.body.tags + '.*' } });
        // const image = await Image.find({ tags: { $tagsIndex: '*'+ req.body.tags+'*' } });
        console.log(image)
        res.send(image);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).send('The Image with the given ID was not found.');
        res.send(image);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}


exports.add = async (req, res) => {

    if (req.body.hasOwnProperty('_id')) {
        delete req.body._id
    }
    console.log(req.body)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.body.userId)
    if (!user) return res.status(404).send('The user with the given ID was not found.');


    let image = new Image({
        name: req.body.name,
        tags: req.body.tags,
        imgUrl: req.body.imgUrl,
        userId: req.body.userId
    });

    try {
        image = await image.save();
        res.send(image);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.update = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let image = await Image.findById(req.params.id)
    if (!image) return res.status(404).send('The Image with the given ID was not found.');


    if (req.body._id) {
        delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        image[key] = value
    })

    try {
        image = await image.save();
        res.send(image);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.delete = async (req, res) => {
    console.log('deleteing this image: ' + req.params.id)
    try {
        const image = await Image.findByIdAndRemove(req.params.id);
        if (!image) return res.status(404).send('The Image with the given ID was not found.');
        res.send(image);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};


exports.deleteByUrl = async (req, res) => {
    console.log(req.body.imgUrl);
    try {
        const image = await Image.findOneAndDelete({ "imgUrl": req.body.imgUrl });
        if (!image) return res.status(404).send('The Image with the given imgUrl was not found.');

        res.send(image);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};