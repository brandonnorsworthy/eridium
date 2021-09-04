const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    name: {
      type: String,
      required: 'Please enter a server name!',
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    icon: {
      type: String,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
      },
    ],
  });
  
  const Server = model('Server', serverSchema);
  
  module.exports = Server;