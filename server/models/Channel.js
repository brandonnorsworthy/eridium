const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
    channel_name: {
      type: String,
      required: 'Please enter a channel name!',
      minlength: 1,
      maxlength: 100,
      trim: true,
    },
    server: [
      {
        type: Schema.Types.ObjectId,
        ref: "Server"
      }
    ],
  });
  
  const Channel = model('Channel', channelSchema);
  
  module.exports = Channel;