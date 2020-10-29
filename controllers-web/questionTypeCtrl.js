const { QuestionType, validate } = require('../models/questionType');

exports.get = async (req, res) => {
    try {
        const questiontype = await QuestionType.find();
        res.send(questiontype);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const questiontype = await QuestionType.findById(req.params.id);
        if (!questiontype) return res.status(404).send('The QuestionType with the given ID was not found.');
        res.send(questiontype);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.add = async (req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    // const questionType = await QuestionType.findById(req.body.questionTypeId);//we should get it with the body
    // if (!questionType) return res.status(400).send('Invalid QuestionType.');

    let questionType = new QuestionType({
        name: req.body.name,
        isActive: req.body.isActive,
        displayOrder: req.body.displayOrder,
        description: req.body.description
    });

    try {
        questionType = await questionType.save();
        res.send(questionType);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};


exports.update = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const questionType = await QuestionType.findById(req.params.id)
    if (!questionType) return res.status(404).send('The Question Type with the given ID was not found.');

    if (req.body._id) {
        delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        questionType[key] = value
    })

    try {
        questionType = await questionType.save();
        res.send(questionType);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};


exports.delete = async (req, res) => {
    try {
        const questiontype = await QuestionType.findByIdAndRemove(req.params.id);
        if (!questiontype) return res.status(404).send('The QuestionType with the given ID was not found.');
        res.send(questiontype);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

// function vlaidateQuestionType(questiontype) {
//     const schema = {
//         name: Joi.string().min(3).required(),
//         description: Joi.string().max(100)
//     }
//     return Joi.validate(questiontype, schema);
// }



