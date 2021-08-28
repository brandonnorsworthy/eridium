const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    server_name: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  });
  
  const Server = model('Server', serverSchema);
  
  module.exports = Server;