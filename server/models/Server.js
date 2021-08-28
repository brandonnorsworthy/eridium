const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
    server_name: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
  });
  
  const Server = model('Server', serverSchema);
  
  module.exports = Server;