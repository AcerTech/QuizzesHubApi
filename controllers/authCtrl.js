const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
// const mongoose = require('mongoose');
// const express = require('express');
// const { use } = require('../api');
// const router = express.Router();



exports.login = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');//we dont to tell the user if user is exist.
  if ( !user.isActive) return res.status(400).send('user account is not confirmed yet, check your email and confirm.');//we dont to tell the user if user is exist.

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY)
  const token = user.generateAuthToken();// check the user.js to see the implementation
  const userInfo = {
    id: user._id,
    name: user.name,
    email: user.email,
    imgUrl:user.imgUrl,
    role: user.role
  }
  await res.status(200).send({ token: token, userInfo: userInfo })


}


exports.forgotPassword = async (req, res) => {

  const { error } = validateEmail(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');//we dont to tell the user if user is exist.

  const salt = await bcrypt.genSalt(10);

  const resetToken = jwt.sign({ _id: this._id }, process.env.JWT_RESET_PW_KEY, { expiresIn: "30m" });
  user.resetPasswordToken = resetToken;

  await user.save();
  sendResetPasswordEmail(req, resetToken)
  await res.status(204).send('OK') //10/20/2020

}



//========================================
// Reset Password Route
//========================================

exports.resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken) return res.status(400).send('Token not provided.');

  jwt.verify(resetToken, process.env.JWT_RESET_PW_KEY, (err, verifiedJwt) => {
    if (err) return res.status(400).send(err.message)
  })


  let user = await User.findOne({ resetPasswordToken: req.body.resetToken });
  if (!user) return res.status(400).send('User with this token does not exists.');


  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  user.resetPasswordToken = ''
  await user.save();

  const token = user.generateAuthToken();
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
  const userInfo = {
    id: user._id,
    name: user.name,
    email: user.email,
    imgUrl:user.imgUrl,
    role: user.role
  }

  await res.status(200).send({ token: token, userInfo: userInfo })

}

//this custom validation to validate email and password only
function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });
  return schema.validate(user);
}

//this custom validation to validate email only
function validateEmail(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email()
  });
  return schema.validate(user);
}



//mailgun
// function sendEmail(req, resetToken) {
//   // const mg = mailgun({ apiKey: process.env.MAILGUN_KEY, domain: MAILGUN_DOMAIN });
//   const mailgun = require("mailgun-js");
//   const DOMAIN = "sandboxfb3c6b0760044524afc655e51f598b17.mailgun.org";
//   const mg = mailgun({ apiKey: "67a4a5f13f59de53553cc83fbf6905b1-0d2e38f7-8d82c125", domain: DOMAIN });
//   const data = {
//     from: "Mailgun Sandbox <postmaster@sandboxfb3c6b0760044524afc655e51f598b17.mailgun.org>",
//     to: req.body.email,
//     subject: "Hello",
//     html: `<h2>Please click on the link below to reset your password</h2>
//           <a href="http://${req.headers.host}/reset-password/${resetToken}">Click here</a>`
//   };
//   mg.messages().send(data, function (error, body) {
//     console.log(body);
//   });

// }

//nodemailer
function sendResetPasswordEmail(req, resetToken) {

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
    subject: 'Reset password link!',
    html: `
    <h2>Please click on the link below to reset your password</h2>
    <a href="http://localhost:4200/reset-password/${resetToken}">Click here</a>
    `

    //<a href="https://ezlearnweb.web.app/reset-password/${resetToken}">Click here</a>
    // < a href="http://${req.headers.host}/reset-password/${resetToken}" > Click here</a>
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


// function sendEmail(email, emailSubject, txt) {

//   var transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'acerTech20@gmail.com',
//       pass: 'Sarah2006@'
//     }
//   });


//   var mailOptions = {
//     from: process.env.MAIN_EMAIL,
//     to: email,
//     subject: emailSubject,
//     html: `
//     <h2>${txt}</h2>

//     `
//     // < a href="http://${req.headers.host}/reset-password/${resetToken}" > Click here</a>
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log('Email error');
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

// };