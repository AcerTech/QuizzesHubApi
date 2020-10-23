// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/user');
// const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();



exports.get = async (req, res) => {

  try {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
  } catch (ex) {
    for (field in ex.errors)
      console.log(ex.errors[field].message)
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
    await user.save();

    //will login the user after register rightaway
    const token = user.generateAuthToken();//check the user.js to see the implementation for this method.
    // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email', 'role']));
    await res.status(200).json({ user: _.pick(user, ['_id', 'name', 'email', 'role']), token: token })


  } catch (ex) {
    for (field in ex.errors)
      console.log(ex.errors[field].message)
  }

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
