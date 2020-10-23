const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const express = require('express');
const app = express();
var cors = require('cors')
app.use(cors())
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json())

//Here we checking if the private ket is set, overwise the app will exit.
if (!process.env.JWT_PRIVATE_KEY) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

port = process.env.PORT || 3000;
app.use('/api', require('./api'))
var db_url = "";
console.log("NODE_ENV :" + process.env.NODE_ENV)

if (process.env.NODE_ENV == 'development') {
    db_url = process.env.DEV_DB_URL
} else {
    db_url = process.env.PROD_DB_URL
}

// console.log("Database url: " + db_url)
require('./startup/db')(db_url);
require('./startup/prod')(app);


app.listen(port, () => {
    console.log('Running on port ' + port);
});

module.exports = app