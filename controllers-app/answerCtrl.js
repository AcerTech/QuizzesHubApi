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
