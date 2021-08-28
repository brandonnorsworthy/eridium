const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
    message_body: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 2000,
      trim: true,
    },
    message_author: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    server: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Server',
        },
      ],
  });
  
  const Message = model('Message', messageSchema);
  
  module.exports = Message;