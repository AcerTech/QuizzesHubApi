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
        // console.log(image)
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

