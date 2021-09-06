const db = require('../config/connection');
const { User, Message, Server, Channel } = require('../models');
const userSeeds = require('./userSeeds.json');
const channelSeeds = require('./channelSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const serverSeeds = require('./serverSeeds.json');

//steps
// 1. create a user that can be the owner of a server
// 2. create the channels to put into a server
// 3. create server and put the owner._id in and put the channel._ids in and set the only member as the owner
// 4. create rest of users and put them in that server
// 5. create a message with a random owner and put that message in a randomly chosen channel

db.once('open', async () => {
	try {
		await Server.deleteMany({});
		await Message.deleteMany({});
		await User.deleteMany({});
		let channelIds = [];
		let userIds = [];

		const { _id: serverOwnderId } = await User.create(userSeeds[0]);
		console.log('created server owner');

		//create the channels
		for (let i = 0; i < channelSeeds.length; i++) {
			const { _id } = await Channel.create(channelSeeds[i]);
			channelIds.push(_id)
		}
		console.log('created new channels');

		//first user creates server and is set as the owner and join the server
		const { _id: ServerId } = await Server.create({ ...serverSeeds[0], owner_id: serverOwnderId, users: serverOwnderId, rooms: channelIds });
		console.log('created server');

		//create all users and add them the default server
		for (let i = 1; i < userSeeds.length; i++) {
			const { _id } = await User.create(userSeeds[i]);
			await Server.findOneAndUpdate(
				{ _id: ServerId }, //pick a random channel to put messages in there
				{ $addToSet: { users: _id } }
			);
			userIds.push(_id)
		}
		console.log('created new users');

		console.log('users added to server')

		//put server owner in userIds array so they can be included in the messages
		userIds.push(serverOwnderId)

		//create messages and randomly place them in channels
		for (let i = 0; i < messageSeeds.length; i++) {
			const { _id } = await Message.create({ ...messageSeeds[i], user_id: userIds[Math.floor(Math.random() * userIds.length)] });
			await Channel.findOneAndUpdate(
				{ _id: channelIds[Math.floor(Math.random() * channelIds.length)] }, //pick a random channel to put messages in there
				{ $addToSet: { messages: _id } }
			);
		}
		console.log('created messages')

	} catch (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('all done!');
	process.exit(0);
});