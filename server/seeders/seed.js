const db = require('../config/connection');
const { User, Message, Server } = require('../models');
const userSeeds = require('./userSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const serverSeeds = require('./serverSeeds.json');

db.once('open', async () => {
  try {
    await Server.deleteMany({});
    await Message.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);

    for (let i = 0; i < messageSeeds.length; i++) {
      const { _id, messageAuthor } = await Message.create(messageSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: messageAuthor },
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