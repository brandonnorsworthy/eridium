const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    server_name: {
      type: String,
      required: 'Please enter a server name!',
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    server_pic_url: {
      type: String,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  });
  
  const Server = model('Server', serverSchema);
  
  module.exports = Server;