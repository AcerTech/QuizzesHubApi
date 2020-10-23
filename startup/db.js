
var mongoose = require('mongoose')

module.exports = function (db_url) {
    mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
        console.log(err)
    })
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => console.log('Connected to MongoDb'));

}