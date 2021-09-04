const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
    body: {
      type: String,
      required: 'You need to leave a message!',
      minlength: 1,
      maxlength: 750,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    user_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    ],
  });
  
  const Message = model('Message', messageSchema);
  
  module.exports = Message;