const { Answer, validate } = require('../models/answer');

exports.get = async (req, res) => {
    try {
        const answer = await Answer.find();
        res.send(answer);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.getById = async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) return res.status(404).send('The Answer with the given ID was not found.');
        res.send(answer);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
}

exports.add = async (req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let answer = new Answer({
        answerText: req.body.answerText,
        isCorrect: req.body.isCorrect,
        imgUrl: req.body.imgUrl,
        displayOrder: req.body.displayOrder,
        question: req.body.questionId
    });

    try {
        answer = await answer.save();
        res.send(answer);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }

};

exports.update = async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let answer = await Answer.findById(req.params.id)
    if (!answer) return res.status(404).send('The Answer with the given ID was not found.');


    if (req.body._id) {
        delete req.body._id
    }

    Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        answer[key] = value
    })

    try {
        answer = await answer.save();
        res.send(answer);

    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};

exports.delete = async (req, res) => {
    try {
        const answer = await Answer.findByIdAndRemove(req.params.id);
        if (!answer) return res.status(404).send('The Answer with the given ID was not found.');
        res.send(answer);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
};
