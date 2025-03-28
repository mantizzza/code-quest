const { createNewProfile, savePlayer } = require('../utils/playerUtils');

module.exports = {
  name: 'reset',
  description: 'Reset your character to level 1 starting state',
  async execute(message) {
    const userId = message.author.id;
    const username = message.author.username;

    const profile = createNewProfile(userId, username);
    savePlayer(userId, profile);

    message.channel.send(`🔄 Your character has been reset to a fresh state!`);
  }
};