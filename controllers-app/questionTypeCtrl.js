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
