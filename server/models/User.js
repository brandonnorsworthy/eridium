const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: 'Username is required',
    trim: true,
    maxlength: 30,
    minlength: 3
  },
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
    match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: 'Password is required',
    maxlength: 30,
    minlength: 5
  },
  profile_picture: {
    type: String,
    default: null
  },
  servers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Server',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
