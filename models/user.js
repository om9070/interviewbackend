const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const validator = require('validator');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generatetoken = async function () {
    try {
      const token = jwt.sign(
        { _id: this._id.toString() },
        process.env.SECRET_TOKEN
      ,{
        expiresIn: '15h'
    });
      this.token = token;
      await this.save();
      return token;
    } catch (e) {
      console.log("token problem", e);
    }
  };

const User = mongoose.model('User', userSchema);

module.exports = User;
