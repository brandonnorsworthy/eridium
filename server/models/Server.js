const { Schema, model } = require('mongoose');

const serverSchema = new Schema({
	name: {
		type: String,
		required: 'Server name required',
		minlength: 1,
		maxlength: 30,
		trim: true,
	},
	icon: {
		type: String
	},
	owner_id: {
		type: Schema.Types.ObjectId,
		required: 'Server owner required',
		ref: 'User'
	},
	users: [
		{
			type: Schema.Types.ObjectId,
			required: 'Server must atleast have owner as a member',
			ref: 'User'
		}
	],
	channels: [
		{
			type: Schema.Types.ObjectId,
			required: 'Server must have atleast one channel',
			ref: 'Channel'
		}
	],
});

const Server = model('Server', serverSchema);

module.exports = Server;