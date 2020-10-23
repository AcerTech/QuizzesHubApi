const { Grade, validate } = require('../models/grade');

exports.get = async (req, res) => {
    try {
        const grade = await Grade.find();
        res.send(grade);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}

exports.getById = async (req, res) => {
    try {
        const grade = await Grade.findById(req.params.id);
        if (!grade) return res.status(404).send('The Grade with the given ID was not found.');
        res.send(grade);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

}

exports.add = async (req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let grade = new Grade({
        name: req.body.name,
        description: req.body.description,
        isActive: req.body.isActive,
        displayOrder: req.body.displayOrder
    });

    try {
        grade = await grade.save();
        res.send(grade);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let grade = await Grade.findById(req.params.id)
    if (!grade) return res.status(404).send('The Grade with the given ID was not found.');


    if (req.body._id) {
        delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        grade[key] = value
    })

    try {
        grade = await grade.save();
        res.send(grade);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.delete = async (req, res) => {


    try {
        const grade = await Grade.findByIdAndRemove(req.params.id);
        if (!grade) return res.status(404).send('The Grade with the given ID was not found.');
        res.send(grade);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};
