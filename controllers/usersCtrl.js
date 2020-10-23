const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const nodemailer = require('nodemailer')
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();



exports.get = async (req, res) => {

  try {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  } catch (error) {
    for (field in error.errors)
      console.log(error.errors[field].message)
  }
}


exports.register = async (req, res) => {

  try {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.confirmationToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PW_KEY, { expiresIn: "30m" });
    console.log(user)

    //will login the user after register rightaway
    // const token = user.generateAuthToken();//10/20/2020//check the user.js to see the implementation for this method.
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
    // await res.status(200).json({ user: _.pick(user, ['_id', 'name', 'email', 'role', 'imgUrl']), token: token })//10/20/2020

    await user.save(function (err, doc) {
      if (err) {
        console.error(err)
        return res.status(400).send(err);
      }
      console.log('data saved')
      sendConfirmationEmail(req, user.confirmationToken)//10/20/2020
    });

    //it is ok to use the reset pw key to encript
    // const confirmationToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PW_KEY, { expiresIn: "30m" });
    // user.confirmationToken = confirmationToken;


    await res.status(204).json('User info is saved');

  } catch (error) {
    for (field in error.errors)
      console.log(error.errors[field].message)
  }

};


exports.resendConfirmationEmail = async (req, res) => {
 
  try {
    // const { error } = validateEmail(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    // console.log('resend confirm email ' + req.body.email)
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email.');//we dont to tell the user if user is exist.
    
    if (user.isActive) return res.status(400).send('Acount is already activited!');
    const salt = await bcrypt.genSalt(10);

    const confirmationToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PW_KEY, { expiresIn: "30m" });
    user.confirmationToken = confirmationToken;
  
    await user.save();
    await user.save(function (err, doc) {
      if (err) {
        console.error(err)
        return res.status(400).send(err);
      }
      console.log('data saved')
    });

    sendConfirmationEmail(req, confirmationToken)

  } catch (error) {
    for (field in error.errors)
      console.log(error.errors[field].message)
  }

};



exports.confirm = async (req, res) => {
  try {
    const { confirmationToken } = req.body;
    if (!confirmationToken) return res.status(400).send('Token not provided.');
    jwt.verify(confirmationToken, process.env.JWT_RESET_PW_KEY, (err, verifiedJwt) => {
      if (err) return res.status(400).send(err.message);
    })
    let user = await User.findOne({ confirmationToken: req.body.confirmationToken });
    if (!user) return res.status(400).send('User with this token does not exists.');
    if (user.isActive) return res.status(400).send('Account is already activated.');

    user.isActive = true;
    user.confirmationToken = '';
    await user.save();

    await res.status(204).send('Email confirmed!');
  } catch (error) {
    for (field in error.errors)
      console.log(ex.errors[field].message)
  }
}

exports.updateUserInfo = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findById(req.params.id);
    if (!user) return res.status(400).send('User is not found.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password.');
    user = {
      id: user._id,
      name: user.name,
      email: user.email,
      imgUrl: user.imgUrl,
      role: user.role
    }
    //will login the user after register rightaway
    const token = user.generateAuthToken();//check the user.js to see the implementation for this method.
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
    await res.status(200).json({ user: _.pick(user, ['_id', 'name', 'email', 'role', 'imgUrl']), token: token })
    user = await User.update({ _id: req.params.id }, user, function (err, raw) {
      if (err) {
        res.send(err);
      }
      return res.status(204).send('The Chapter been updated');
    })

  } catch (error) {
    for (field in error.errors)
      console.log(error.errors[field].message)
  }
};


//this custom validation to validate email only
function validateEmail(reqBody) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email()
  });
  return schema.validate(reqBody);
}


function sendConfirmationEmail(req, token) {
  console.log('email should sent')
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIN_EMAIL,
      pass: process.env.MAIN_EMAIL_PW
    }
  });


  var mailOptions = {
    from: process.env.MAIN_EMAIL,
    to: req.body.email,
    subject: 'Email Confirmation link!',
    html: `
    <h2>Please click on the link below to confirm your emial</h2>
    <a href="http://localhost:4200/confirm/${token}">CLICK HERE TO CONFIRM</a>
    `
    // < a href="http://${req.headers.host}/reset-password/${resetToken}" > Click here</a>

    // < a href="https://ezlearnweb.web.app/confirm/${token}" > CLICK HERE TO CONFIRM</a>
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Email error');
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

};

// router.post('/', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   let user = await User.findOne({ email: req.body.email });
//   if (user) return res.status(400).send('User already registered.');

//   user = new User(_.pick(req.body, ['name', 'email', 'password']));
//   const salt = await bcrypt.genSalt(10);
//   user.password = await bcrypt.hash(user.password, salt);
//   await user.save();

//   const token = user.generateAuthToken();
//   res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
// });
