const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const messageSchema = new Schema({
	body: {
		type: String,
		required: 'Message cannot be empty',
		minlength: 1,
		maxlength: 750,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user_id: {
		type: Schema.Types.ObjectId,
		required: 'Message has to have a owner',
		ref: "User"
	},
});

const Message = model('Message', messageSchema);

module.exports = Message;