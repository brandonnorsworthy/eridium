const { Schema, model } = require('mongoose');

const channelSchema = new Schema({
	name: {
		type: String,
		required: 'Channel name required',
		minlength: 1,
		maxlength: 30,
		trim: true,
	},
	topic: {
		type: String,
	},
	category: {
		type: String,
		required: true
	},
	messages: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Message'
		}
	],
	users: [
		{
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	],
});

const Channel = model('Channel', channelSchema);

module.exports = Channel;