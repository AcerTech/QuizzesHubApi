const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  imgUrl: {
    type: String,
    required: false,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  role: {
    type: String,
    default: 'user',
    maxlength: 255,
  },
  resetPasswordToken: { type: String, default: '' },
  confirmationToken: { type: String, default: '' }
});

//We embaded this method with user object, and will use it in authCtrl. this._id: to get the current user id.
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role, imgUrl: this.imgUrl, isActive: this.isActive }, process.env.JWT_PRIVATE_KEY);
  return token;
}

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    imgUrl: Joi.string().max(255),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });
  return schema.validate(user);
}


exports.validate = validateUser;
exports.userSchema = userSchema;
exports.User = mongoose.model('User', userSchema);