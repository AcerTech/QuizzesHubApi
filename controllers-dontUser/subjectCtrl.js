const { Subject, validate } = require('../models/subject');
const { Grade } = require('../models/grade');

exports.get = async (req, res) => {

    try {
        const subject = await Subject.find();
        res.send(subject);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).send('The Subject with the given ID was not found.');
        res.send(subject);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getByGradeId = async (req, res) => {
    console.log(req.params.id)
    const subject = await Subject.find({ 'grade._id': req.params.id });
    if (!subject) return res.status(404).send('The Grade with the given ID was not found.');
    try {
        res.send(subject);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.add = async (req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const grade = await Grade.findById(req.body.gradeId);//we should get it with the body
    if (!grade) return res.status(400).send('Invalid Grade.');

    let subject = new Subject({
        name: req.body.name,
        isActive: req.body.isActive,
        description: req.body.description,
        displayOrder: req.body.displayOrder,
        grade: {
            _id: grade._id,
            name: grade.name
        }
    });

    try {
        subject = await subject.save();
        res.send(subject);

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
        subject = await subject.save();
        res.send(subject);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};


exports.delete = async (req, res) => {
    try {
        const subject = await Subject.findByIdAndRemove(req.params.id);
        if (!subject) return res.status(404).send('The Subject with the given ID was not found.');
        res.send(subject);
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



