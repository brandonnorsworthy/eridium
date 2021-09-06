const db = require('../config/connection');
const { User, Message, Server, Channel } = require('../models');
const userSeeds = require('./userSeeds.json');
const channelSeeds = require('./channelSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const serverSeeds = require('./serverSeeds.json');

db.once('open', async () => {
	try {
		await Server.deleteMany({});
		await Message.deleteMany({});
		await User.deleteMany({});
		let firstUserId = null;
		let userIds = [];
		let channelIds = [];

		//create all users
		for (let i = 0; i < userSeeds.length; i++) {
			const { _id } = await User.create(userSeeds[i]);
			if (i === 0) {
				console.log('first user:\n', _id);
				firstUserId = _id; //save the first user so we can identify the owner of the server
			}
			userIds.push(_id)
		}
		console.log('new users:\n', userIds);

		//create the channels
		for (let i = 0; i < channelSeeds.length; i++) {
			const { _id } = await Channel.create(channelSeeds[i]);
			channelIds.push(_id)
		}
		console.log('new channels:\n', channelIds);

		//first user creates server and is set as the owner and join the server
		const newServer = await Server.create({ ...serverSeeds[0], owner_id: firstUserId, users: userIds, rooms: userIds });
		console.log('first server:\n', newServer);

		for (let i = 0; i < messageSeeds.length; i++) {
			const { _id } = await Message.create(messageSeeds[i]);
			await Channel.findOneAndUpdate(
				{ _id: channelSeeds[Math.floor(Math.random * channelSeeds.length)] }, //pick a random channel to put messages in there
				{
					$addToSet: {
						messages: _id,
					},
				}
			);
		}
	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('all done!');
	process.exit(0);
});