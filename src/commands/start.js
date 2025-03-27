const { createNewProfile, loadPlayer } = require('../utils/playerUtils.js');

module.exports = {
  name: 'start',
  description: 'Start your Code Quest journey!',
  async execute(message) {
    const userId = message.author.id;

    if (loadPlayer(userId)) {
      return message.channel.send(`👤 You already have a character, ${message.author.username}!`);
    }

    createNewProfile(userId, message.author.username);

    message.channel.send(`✨ Welcome to Code Quest, ${message.author.username}! Your profile has been created.`);
  }
};
